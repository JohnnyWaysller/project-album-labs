//funcao para criar elmentos e renderizar playlist inserida Front-End (nova playlist)
import { animateElement, closeLayout } from './layoutControl.js'
//variavel do modal (atualiza estado/referencia qual playlist tera nova adicao)
import { currentlyselectedPlaylist } from './modalToAddmusic.js'
//funcao remover item da playlist
import {deleteSongtoPlaylist } from './deleteMusics.js'

const renderdivContainer = document.getElementById('playlist-container')


function manageButtonsSvg(){
    //criando svg
    const editSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const editUse = document.createElementNS('http://www.w3.org/2000/svg', 'use')
    //criando <use>
    const delSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
    const delUse =document.createElementNS('http://www.w3.org/2000/svg', 'use')
    //atribuindo propriedades e classes
    editSvg.classList.add('icoon-edit')
    delSvg.classList.add('icon-del')
    editSvg.setAttribute('aria-hidden', 'true')
    delSvg.setAttribute('aria-hidden', 'true')
    editSvg.setAttribute('focusable', 'false')
    delSvg.setAttribute('focusable', 'false')
    editUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/icon/edit.svg#edi-icon')
    delUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/icon/icondel.svg#delicon')
    //criando botao e suas propiedades
    const editBtn = document.createElement('button')
    const delBtn = document.createElement('button')
    editBtn.classList.add('edit-btn')
    editBtn.id = "edit-btn"
    delBtn.classList.add('del-btn')
    delBtn.id = "del-btn"
    //inserindo elementos Buttons>Svg>Use
    editSvg.appendChild(editUse)
    delSvg.appendChild(delUse)
    editBtn.appendChild(editSvg)
    delBtn.appendChild(delSvg)
    //criando container para todos elmentos anteriores
    const manageContainer = document.createElement('div')
    manageContainer.classList.add('manage-playlist')
    manageContainer.append(editBtn, delBtn)
    return manageContainer
}

export function renderlastCreated(playlist) {

    //criando a div que agrupa ultima playlist criada
    const groupdivContent = document.createElement('div')
    groupdivContent.classList.add('playlists-mylibrary') /*classe final animacao*/
    groupdivContent.classList.add('initposition') /*posicao inicial*/

    //criando a div que refere a propria playlist
    const renderdivContent = document.createElement('div')
    renderdivContent.id = playlist.id
    renderdivContent.classList.add('playlist-placeholder-image')

    //funcao criar botoes edit/delet(svg) para playlists dinamicamente
    const containerManagePlaylist = manageButtonsSvg()
    renderdivContent.append(containerManagePlaylist)


    //criando titulo
    const playlistname = document.createElement('span')
    playlistname.textContent = playlist.name
    /*cada id do titulo = id original(nome-IDoriginal)*/
    playlistname.id = playlist.name + '-' + playlist.id
    /*classe geral abaixo para estilizacao conjunta dos titulos*/
    playlistname.classList.add('playlists-title')

    groupdivContent.append(renderdivContent, playlistname)

    /*coloca elmento no começo no container(contrario ao append)*/
    renderdivContainer.prepend(groupdivContent)

    //animacao de transicao das playlist
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            groupdivContent.classList.remove('initposition')
        })

    })

}

/*FUNCAO PARA RENDERIZAR AS PLAYLISTS AO CLICÁ-LAS*/
export function renderclickedPlaylist(playlist) {
    //div container
    const containerforPlaylist = document.getElementById('container-for-playlist')
    containerforPlaylist.classList.add('display-flex-class')
    // containerforPlaylist.style.display = 'flex'
    //obtem antiga playlist se houver
    const oldSectionplaylist = containerforPlaylist.querySelector('.sectionplaylist')

    /*botao voltar/fechar*/
    const closePage = document.createElement('button')
    closePage.classList.add('closeBtn')
    closePage.textContent = 'fechar'
    closePage.addEventListener('click', () => {
        currentlyselectedPlaylist.current = null
        closeLayout(containerforPlaylist)
    })
    //criando botao p/ remover musica
    const removeItemBtn = document.createElement('button')
    removeItemBtn.classList.add('removePlaylistItem')
    removeItemBtn.textContent = 'Remover'
    removeItemBtn.id = 'delMusicBtn'
    removeItemBtn.style.display = 'none'


    if (oldSectionplaylist) {
        //remove classe de entrada e adiciona de saida
        oldSectionplaylist.classList.remove('entered')
        oldSectionplaylist.classList.add('exiting')

        //evento para transicao de saida
        oldSectionplaylist.addEventListener('transitionend', function handler() {
            //remove proprio evento para nao ser chamado novamente
            oldSectionplaylist.removeEventListener('transitionend', handler)

            //quando animacao terminar, remove a playlist antiga
            containerforPlaylist.removeChild(oldSectionplaylist)

            rendernewPlaylist(playlist, containerforPlaylist, closePage, removeItemBtn)
        })

    } else {
        rendernewPlaylist(playlist, containerforPlaylist, closePage, removeItemBtn)
    }
}

function rendernewPlaylist(playlist, containerforPlaylist, closePage, removeItemBtn) {
    //apenas para modal//ignorar para outra analise
    currentlyselectedPlaylist.current = {
        id: playlist.id,
        name: playlist.name
    }

    //criando elementos para representar a playlist
    //div contem todo grupo
    const sectionplaylist = document.createElement('section')
    sectionplaylist.classList.add('sectionplaylist')
    sectionplaylist.classList.add('entering')

    //nome da playlist
    const playlistname = document.createElement('h3')
    playlistname.textContent = playlist.name
    playlistname.classList.add('playlist-title')

    //box de items(tag)
    const playlisttag = document.createElement('span')
    playlisttag.classList.add('playlisttag')
    //box de items(music)
    const playlistmusicbox = document.createElement('ul')

    const grouptitlesdiv = document.createElement('div')
    grouptitlesdiv.classList.add('grouptitlesdiv')

    grouptitlesdiv.appendChild(playlistname)

    if (playlist.tags.length > 0) {
        let tagcontent = ''
        playlist.tags.forEach(tag => {
            tagcontent += tag + ' - '
        })
        //remove dois ultimos caractere da string
        playlisttag.textContent = tagcontent.slice(0, -2)
        grouptitlesdiv.appendChild(playlisttag)
    }
    sectionplaylist.appendChild(grouptitlesdiv)

    if (playlist.musics.length > 0) {
        playlist.musics.forEach((music, i) => {
            const musicItem = document.createElement('li')
            musicItem.classList.add('item-music')
            musicItem.dataset.index = i
            musicItem.textContent = music.title + ' - ' + music.artist + ' - ' + music.year
            playlistmusicbox.appendChild(musicItem)
        })
    } else {
        const musicItem = document.createElement('li')
        musicItem.textContent = "Playlist Vazia"
        musicItem.classList.add('item-music')
        playlistmusicbox.appendChild(musicItem)
    }

    deleteSongtoPlaylist(playlist, playlistmusicbox, removeItemBtn)

    containerforPlaylist.prepend(removeItemBtn)
    sectionplaylist.appendChild(playlistmusicbox)

    containerforPlaylist.appendChild(closePage)
    containerforPlaylist.appendChild(sectionplaylist)
    animateElement(containerforPlaylist, 3000, "containerforPlaylist")

    // Força o navegador a recalcular o layout antes de aplicar a próxima classe.
    void sectionplaylist.offsetWidth

    // Remove a classe 'entering' e adiciona a classe 'entered' para iniciar a animação de entrada
    sectionplaylist.classList.remove('entering')
    sectionplaylist.classList.add('entered')

}




