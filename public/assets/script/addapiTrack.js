import { currentlyselectedPlaylist } from './modalToAddmusic.js'
import { apisearchtrackContent, apisearchartistContent, apisearchartistdata } from './fetchApi.js'
import { fetchAddmusicToplaylist, fetchtargetPlaylist, fetchAddsongtoMymusics } from "./fetchLibrary.js"
import { renderclickedPlaylist } from "./renderPlaylist.js"

const albumCarousel = document.getElementById('album-carousel')
const ulmymusicsContainer = document.getElementById('my-musics-ul')

const albumsvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
const musicsvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
const albumuse = document.createElementNS('http://www.w3.org/2000/svg', 'use')
const musicuse = document.createElementNS('http://www.w3.org/2000/svg', 'use')

albumsvg.classList.add('albumbtn-svg')
musicsvg.classList.add('music-svg')

albumsvg.setAttribute('aria-hidden', 'true')
musicsvg.setAttribute('aria-hidden', 'true')
albumsvg.setAttribute('focusable', 'false')
musicsvg.setAttribute('focusable', 'false')

albumuse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/icon/playlistadd.svg#playlist-icon')
musicuse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/icon/songadd.svg#song-svg')

albumsvg.append(albumuse)
musicsvg.append(musicuse)

const addtoalbum = document.createElement('button')
addtoalbum.classList.add('addtoalbum-btn')
addtoalbum.append(albumsvg)

const addtomusics = document.createElement('button')
addtomusics.classList.add('addtomusics-btn')
addtomusics.append(musicsvg)

let itemId = ''
let hideButtonsTimer = null

addtoalbum.addEventListener('click', async (event) => {
    event.stopPropagation()
    let trackId = itemId

    if (currentlyselectedPlaylist.current) {
        try {
            const selectedplaylistId = currentlyselectedPlaylist.current.id

            const trackItem = await apisearchtrackContent(trackId)

            let selectedMusic = {
                id: trackItem.id,
                title: trackItem.name,
                year: trackItem.album.release_date,
                artist: trackItem.artists[0].name,
                album: trackItem.album.name,
            }

            let artisId = trackItem.artists[0].id

            const artistforGenre = await apisearchartistdata(artisId)
            //req para artist/obter album/artist> genero

            //req salvar no banco
            const sendedtrackItem = await fetchAddmusicToplaylist(selectedplaylistId, selectedMusic, artistforGenre.genres)

            alert(`"${selectedMusic.title}" adicionada à playlist "${currentlyselectedPlaylist.current.name}"!`)

            const playlistData = await fetchtargetPlaylist(selectedplaylistId)
            renderclickedPlaylist(playlistData)

        }
        catch (error) {
            console.error('Erro ao adicionar música à playlist:', error)
            alert('Não foi possível adicionar a música à playlist. Tente novamente.')
        }

    } else {
        alert(`selecione uma Playlist para adicionar a música`)
    }
})

addtomusics.addEventListener('click', async (event) => {
    event.stopPropagation()
    let trackId = itemId

    const trackItem = await apisearchtrackContent(trackId)
    const trackContent = `${trackItem.name} - ${trackItem.album.release_date} - Artist: ${trackItem.artists[0].name} - Album: ${trackItem.album.name}`

    const itemTrack = cretanewSong(trackContent)
    itemTrack.dataset.musicId = trackItem.id

    let selectedMusic = {
        id: trackItem.id,
        title: trackItem.name,
        year: trackItem.album.release_date,
        artist: trackItem.artists[0].name,
        album: trackItem.album.name,
    }
    try {
        const response = await fetchAddsongtoMymusics(selectedMusic)

        if(response) {
            // Se o backend confirmou o sucesso, renderize a música
            ulmymusicsContainer.prepend(itemTrack)
        } 

    } catch(error) {
        if (error.message.includes('409') || error.message.includes('existe')) {
            alert('Música já existe na lista de músicas.')
        } else {
            console.error('Erro na requisição:', error)
            alert('Ocorreu um erro ao adicionar a música. Por favor, tente novamente.')
        }
    }
})

function cretanewSong(songparam) {
    const songli = document.createElement('li')
    songli.classList.add('addtoPlaylist-li')
    const songcontent = document.createElement('a')
    songcontent.classList.add('addtoPlaylist')
    songcontent.textContent = songparam
    songli.append(songcontent)
    return songli
}


albumCarousel.addEventListener('click', async (event) => {
    const itemTarget = event.target.closest('.track-item')

    clearTimeout(hideButtonsTimer)

    if (!itemTarget) return

    addtoalbum.classList.remove('hidden')
    addtomusics.classList.remove('hidden')

    addtoalbum.classList.remove('final')
    addtomusics.classList.remove('final')
    // addtoalbum.remove()
    // addtomusics.remove()

    const trackId = itemTarget.dataset.trackId
    itemId = trackId
    itemTarget.prepend(addtomusics, addtoalbum)
    void addtoalbum.offsetWidth

    animationBtn()

    hideButtonsTimer = setTimeout(() => {
        addtoalbum.classList.add('hidden')
        addtomusics.classList.add('hidden')
    }, 4000)

})

function animationBtn() {
    addtomusics.classList.add('final')
    addtoalbum.classList.add('final')
}

albumCarousel.addEventListener('mouseleave', () => {
    addtoalbum.classList.add('hidden')
    addtomusics.classList.add('hidden')
})