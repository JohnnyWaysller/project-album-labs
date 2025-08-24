import { fetchtargetPlaylist, fetchdeleteSongtoPlaylist } from './fetchLibrary.js'
import { renderclickedPlaylist } from './renderPlaylist.js'

//array para adicionar indices que serao removidos
let indexToremoveArr = []
//botao de remover
let removeItemButton = null
//playlist para requisicao
let playlist = ''
//container para listener
let playlistmusicBox = null


export async function deleteSongtoPlaylist(playlistparam, playlistmusicbox, removeItemBtn) {

    playlist = playlistparam
    playlistmusicBox = playlistmusicbox
    removeItemButton = removeItemBtn

    playlistmusicBox.addEventListener('click', (ev) => {
        const itemTarget = ev.target.closest('.item-music')
        const indexItem = Number(itemTarget.dataset.index)

        if (!itemTarget) {
            return
        } else {

            if (!indexToremoveArr.includes(indexItem)) {
                indexToremoveArr.push(indexItem)
            } else {
                indexToremoveArr = indexToremoveArr.filter(value => value !== indexItem)
            }

            if (itemTarget.classList.contains('selectedMusictoDelete')) {
                itemTarget.classList.remove('selectedMusictoDelete')
            } else {
                itemTarget.classList.add('selectedMusictoDelete')
            }

        }
        const verifyClassOnContainer = playlistmusicBox.querySelectorAll('.selectedMusictoDelete')

        removeItemButton.style.display = verifyClassOnContainer.length > 0 ? 'block' : 'none'
       
    })

    removeItemButton.addEventListener('click', async () => {
        if (!playlist.id || indexToremoveArr.length <= 0) {
            return
        } else {
            try {
                await fetchdeleteSongtoPlaylist(playlist.id, indexToremoveArr)

                const response = await fetchtargetPlaylist(playlist.id)

                renderclickedPlaylist(response)
                
            } catch (error) {
                console.error(`Erro ao excluir musica de ${playlist.name}`, error)
            }
        }
        indexToremoveArr = []
        removeItemButton.parentNode.removeChild(removeItemButton)

    })

}





