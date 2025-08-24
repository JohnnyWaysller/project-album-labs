import { fetchAddmusicToplaylist, fetchtargetPlaylist } from "./fetchLibrary.js"
import { renderclickedPlaylist } from "./renderPlaylist.js"
import { fetchDeleteSongMymusics } from "./fetchMymusics.js"

let selectedMusic = null
export let currentlyselectedPlaylist = {
    current: null
}

const myMusicContainer = document.getElementById('my-musics')
const modalOverlay = document.getElementById('addtoModalplaylist')
const modalMusicTitle = document.getElementById('modalMusicTitle')
const modalAddtargetMessage = document.getElementById('modalTargetmessage')
const modalAddbtn = document.getElementById('modalAddbtn')
const modalCancelbtn = document.getElementById('modalCancelbtn')
const modalClosebtn = modalOverlay.querySelector('.modalClosebtn')
const myMusicsContainer = document.getElementById('my-musics')

/*icon add*/
const addIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
addIcon.classList.add('iconadd')
addIcon.setAttribute('aria-hidden', 'true')
addIcon.setAttribute('focusable', 'false')
const useaddIcon = document.createElementNS('http://www.w3.org/2000/svg', 'use')
useaddIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/icon/addtrack.svg#addtracks')
addIcon.appendChild(useaddIcon)

//criando botao
const addMusicBtn = document.createElement('button')
addMusicBtn.classList.add('addMusicBtn')
addMusicBtn.id = "addMusicBtn"
// addMusicBtn.textContent = "Adicionar"
addMusicBtn.append(addIcon)
myMusicsContainer.prepend(addMusicBtn)
addMusicBtn.style.display = 'none'


// criando botao delete e svg/use e propriedades
const removeBtn = document.createElement('button')
removeBtn.classList.add('btn-trash')
const svgIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
svgIcon.classList.add('icon-trash')
svgIcon.setAttribute('aria-hidden', 'true')
svgIcon.setAttribute('focusable', 'false')
const useIcon = document.createElementNS('http://www.w3.org/2000/svg', 'use')
useIcon.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/icon/icons.svg#trash-icon')
svgIcon.appendChild(useIcon)
removeBtn.appendChild(svgIcon)

removeBtn.addEventListener('click', async (event) => {

    event.stopPropagation()
    const musicConfirm = confirm(`Deseja remover ${selectedMusic.title}`)
    if (selectedMusic && musicConfirm) { // Verifica se uma música foi selecionada no clique do item da lista
        // alert(`teste ok`)
        try {
            const resp = await fetchDeleteSongMymusics(selectedMusic.id)
            //remover musica
            const music = document.querySelector(`.addtoPlaylist-li[data-music-id="${selectedMusic.id}"]`)
            if (music) {
                music.remove()
            }

        } catch (error) {
            console.error('Erro ao excluir música:', error)
            alert(`Não foi possível excluir "${selectedMusic.title}". Erro: ${error.message}`)
        }
    } else {
        return
    }
})


addMusicBtn.addEventListener('click', () => {
    if (selectedMusic) { // Verifica se uma música foi selecionada no clique do item da lista
        modalMusicTitle.textContent = " ` " + selectedMusic.title + " ´ "
        openModaltoAddplaylist()
    } else {
        console.warn("Nenhuma música selecionada para adicionar à playlist.")
        addMusicBtn.style.display = 'none' // Oculta o botão se não houver música válida
    }
})

function closeModaltoplaylist() {
    modalOverlay.classList.remove('show') // remove classe show para esconder o modal
    selectedMusic = null
    addMusicBtn.style.display = 'none'
    const currentSelected = myMusicsContainer.querySelector('.selectedMusic')
    if (currentSelected) {
        currentSelected.classList.remove('selectedMusic')
    }
}

function openModaltoAddplaylist() {
    modalOverlay.classList.add('show')
    modalAddbtn.disabled = true
    if (currentlyselectedPlaylist.current) {
        // se existe playlist selecionada/aberta
        modalAddtargetMessage.textContent = `à playlist ${currentlyselectedPlaylist.current.name}`
        modalAddbtn.disabled = false
    } else {
        modalAddtargetMessage.textContent = 'Selecione uma playlist para adicinar a musica'
        modalAddbtn.disabled = true
    }
}

modalClosebtn.addEventListener('click', closeModaltoplaylist)
modalCancelbtn.addEventListener('click', closeModaltoplaylist)

//fechar modal com clique fora
modalOverlay.addEventListener('click', (ev) => {
    if (ev.target === modalOverlay) {
        closeModaltoplaylist()
    }
})

myMusicContainer.addEventListener('click', (ev) => {
    // 1. Primeiro, encontre o item da lista (o <li> da música)
    const clickedMusicItem = ev.target.closest('.addtoPlaylist-li')

    // Se o clique não foi em um item de música válido, saia.
    if (!clickedMusicItem) {
        return
    }
    // Isso garante que clickedMusicLink NUNCA será null se clickedMusicItem for válido.
    const clickedMusicLink = clickedMusicItem.querySelector('.addtoPlaylist')

    // Gerenciamento da classe 'selectedMusic' (togleClassElement simplificado)
    const currentlySelectedElement = myMusicsContainer.querySelector('.selectedMusic')

    // Se o item clicado já está selecionado, desselecione-o e limpe o estado
    if (clickedMusicItem === currentlySelectedElement) {
        clickedMusicItem.classList.remove('selectedMusic')

        clickedMusicItem.removeChild(removeBtn)
        selectedMusic = null // Limpa os dados da música
        addMusicBtn.style.display = 'none' // Oculta o botão
        return // Sai da função, pois a ação foi desselecionar
    }

    // Se havia outro item selecionado, remova a classe dele
    if (currentlySelectedElement) {
        currentlySelectedElement.classList.remove('selectedMusic')
    }

    // Adiciona a classe 'selectedMusic' ao item clicado (nova seleção)
    clickedMusicItem.classList.add('selectedMusic')
    clickedMusicItem.appendChild(removeBtn)

    // **NOVA LÓGICA:** Coleta os dados da música e preenche `selectedMusic` AQUI
    const fullTextContent = clickedMusicLink.textContent.trim()
    const partsContent = fullTextContent.split(' - ')

    if (partsContent.length < 4) { // Use .length para arrays
        console.log(`formato de conteúdo para musicas inválido`)
        selectedMusic = null // Garante que a música selecionada seja nula se o formato for inválido
        addMusicBtn.style.display = 'none' // Oculta o botão
        return
    }
    // alert('teste')
    selectedMusic = {
        id: clickedMusicItem.dataset.musicId,
        title: partsContent[0].trim(),
        year: partsContent[1].trim(),
        artist: partsContent[2].replace('Artist:', '').trim(),
        album: partsContent[3].replace('Album:', '').trim(),
    }
    // **NOVA LÓGICA:** Mostra o botão 'Adicionar à playlist' APENAS QUANDO UMA MÚSICA VÁLIDA É SELECIONADA
    addMusicBtn.style.display = 'block'
})

modalAddbtn.addEventListener('click', async () => {
    // Verificações de segurança (o botão já deve estar desabilitado se algo faltar)
    if (!selectedMusic || !currentlyselectedPlaylist.current) {
        alert('Erro: Música ou playlist de destino não selecionada. Recarregue a página.')
        return
    }
    try {

        await fetchAddmusicToplaylist(currentlyselectedPlaylist.current.id, selectedMusic)

        alert(`"${selectedMusic.title}" adicionada à playlist "${currentlyselectedPlaylist.current.name}"!`)
        closeModaltoplaylist() // Fecha o modal após a adição bem-sucedida

        //requisitando novamente mesma playlist, para rederiza com atualizacao
        const playlistData = await fetchtargetPlaylist(currentlyselectedPlaylist.current.id)
        renderclickedPlaylist(playlistData)

    } catch (error) {
        console.error('Erro ao adicionar música à playlist:', error)
        alert('Não foi possível adicionar a música à playlist. Tente novamente.')
    }
})