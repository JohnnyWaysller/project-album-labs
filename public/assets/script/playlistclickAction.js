import { fetchtargetPlaylist } from './fetchLibrary.js'
import { renderclickedPlaylist } from './renderPlaylist.js'
import { fetchdeletePlaylist } from './fetchMymusics.js'
import { animateElementOut } from './layoutControl.js'
import { editplaylistName } from './modalplaylistEdit.js'

//funcoes: ao clicar em uma playlist (div) dispara event para renderizar a playlist selecionada,
//se clicada em um botao de dentro dela(so executa acao do botao sem renderizacao da playlist).
//a selecao da playlist (adiciona a classe para indicar a playlist, apenas se clicada para renderizar)

let selectedPlaylist = null

function selectCurrentPlaylist(target) {
    let playlist = target
    selectedPlaylist = document.querySelector('.playlists-mylibrary.selected')
    if (selectedPlaylist && selectedPlaylist.classList.contains('selected')) {
        selectedPlaylist.classList.remove('selected')
    }
    playlist.classList.add('selected')
}

// O único eventListener no container pai
document.getElementById('playlist-container').addEventListener('click', async function (event) {
    //botao dentro da div
    const delBtn = event.target.closest('.del-btn')

    const editBtn = event.target.closest('.edit-btn')
    //
    const playlistContainer = event.target.closest('.playlists-mylibrary')
    // 1. **VERIFICAÇÃO MAIS ESPECÍFICA:** se clique no botão de deletar
    // console.log(`${playlistContainer.id}`)
    if (delBtn) {
        event.stopPropagation()
        const manageContainer = delBtn.closest('.manage-playlist')
        //id da playlist a excluir
        const targetId = manageContainer.parentElement.id

        if (targetId) {

            const userConfirm = confirm(`Deseja realmnente excluir a Playlist ?`)
            if (userConfirm) {
                try {


                    const datadel = await fetchdeletePlaylist(targetId)

                    animateElementOut(playlistContainer, "playlist", true)
                    // playlistContainer.remove()
                } catch (error) {
                    console.error(`Falha ao tentar excluir playlist ${error}`)
                }
            }

        }
    }
    if (editBtn) {
        event.stopPropagation()
        const manageContainer = editBtn.closest('.manage-playlist')
        //pega nome da playlist (span (title))
        const currentNameElement = manageContainer.closest('.playlists-mylibrary').querySelector('.playlists-title')
        //id da playlist a excluir
        const targetId = manageContainer.parentElement.id


        if (targetId && currentNameElement) {
            // Chama a função do modal, passando o ID e o elemento do nome
            editplaylistName(targetId, currentNameElement)
        }
    }
    // 2. **VERIFICAÇÃO GERAL:** Se não foi no botão, foi em uma playlist?
    else if (playlistContainer) {
        // Se a condição acima for falsa, a lógica de seleção será executada
        selectCurrentPlaylist(playlistContainer)

        //pega div para usar propriedade dela para requisicao posterior
        const playlistDiv = playlistContainer.querySelector('div[id]')

        if (!playlistDiv) {
            console.log(`Não foi possivel playlist para requisicao do ID`)
            return
        }

        try {
            const playlistData = await fetchtargetPlaylist(playlistDiv.id)
            renderclickedPlaylist(playlistData)
        } catch (error) {
            console.error(`Falha ao buscar dados da playlist ${error}`)
        }
    }
})