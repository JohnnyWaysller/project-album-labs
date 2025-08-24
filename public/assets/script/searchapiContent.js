import { apisearchGeralContent } from './fetchApi.js'
import { carouselApi } from './carouselApi.js'
import { closeLayout } from './layoutControl.js'

// Selecionando os elementos do DOM
const albumCarousel = document.getElementById('album-carousel')
const searchBtn = document.getElementById('searchItem')
const searchInput = document.getElementById('searchfield')
const containerviewEnable = document.getElementById('apipageContainer')

//funcoes responsaveis por fazer chamada da requisicao api externa e renderizar as 3 sessoes

// Evento de clique do botão de busca
searchBtn.addEventListener('click', async () => {
    const query = searchInput.value.trim()

    if (query !== "") {
        try {
            const data = await apisearchGeralContent(query)

            //Limpa o conteúdo do carrossel antes de renderizar
            albumCarousel.innerHTML = ''
            containerviewEnable.classList.add('display-flex-class')

            const clearApicontentbtn = document.createElement('button')
            clearApicontentbtn.classList.add('clearApicontentbtn')
            const clearSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
            const cleartUse = document.createElementNS('http://www.w3.org/2000/svg', 'use')
            clearSvg.classList.add('clear-btn')

            clearSvg.setAttribute('aria-hidden', 'true')
            clearSvg.setAttribute('focusable', 'false')
            cleartUse.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', '/assets/icon/clearbtn.svg#btnclear')
            clearSvg.append(cleartUse)
            clearApicontentbtn.append(clearSvg)

            clearApicontentbtn.addEventListener('click', () => {
                closeLayout(containerviewEnable)
                // containerviewEnable.classList.add('display-flex-class')
            })

            //botao limpar api (nao quebrar layout)
            albumCarousel.append(clearApicontentbtn)

            const albums = data.albums.items
            const artists = data.artists.items
            const tracks = data.tracks.items

            if (artists && artists.length > 0) {
                const artistsSection = renderArtists(artists)
                albumCarousel.append(artistsSection)
            }

            if (albums && albums.length > 0) {
                const albumsSection = renderAlbums(albums)
                albumCarousel.append(albumsSection)
            }

            if (tracks && tracks.length > 0) {
                const tracksSection = renderTracks(tracks)
                albumCarousel.append(tracksSection)
            }
            // containerviewEnable.style.display = 'flex'
            // containerviewEnable.classList.add('display-flex-class')

        } catch (error) {
            console.error("Erro ao buscar conteúdo da API:", error)
            alert("Ocorreu um erro ao buscar os dados. Tente novamente.")
        }
    } else {
        alert("O campo de busca não pode estar vazio!")
    }
})

function renderTracks(items) {
    const tracksContainer = document.createElement('div')
    tracksContainer.classList.add('album-container')
    tracksContainer.id = "tracksContainer"

    const trackTitleapi = document.createElement('span')
    trackTitleapi.textContent = 'Tracks'
    trackTitleapi.classList.add('search-titles')

    items.forEach(item => {
        const trackName = document.createElement('h3')
        trackName.textContent = item.name

        const trackalbumName = document.createElement('p')
        const albumyear = item.album.release_date
        trackalbumName.textContent = `Album: ${item.album.name} ${albumyear}`

        const trackContainerUnit = document.createElement('div')
        trackContainerUnit.classList.add('track-item')
        trackContainerUnit.dataset.trackId = item.id

        const selecteditemhover = document.createElement('div')
        selecteditemhover.classList.add('selecteditemhover')

        const imgContainerGroup = document.createElement('div')
        imgContainerGroup.classList.add('imgContainer-track')

        const trackalbumImage = document.createElement('img')
        trackalbumImage.alt = `Capa do Album da Musica ${item.album.name}`

        if (item.album.images && item.album.images.length > 0) {
            trackalbumImage.src = item.album.images[0].url
        } else {
            trackalbumImage.src = '/assets/icon/vinylplaceholder.webp'
        }
        imgContainerGroup.append(trackalbumImage)
        trackContainerUnit.append(imgContainerGroup, trackName, trackalbumName)

        selecteditemhover.append(trackContainerUnit)

        tracksContainer.append(selecteditemhover)


    })

    const tracksSection = document.createElement('div')
    tracksSection.classList.add('track-carousel-section')
    tracksSection.append(trackTitleapi, tracksContainer)

    const groupbuttonsTrack = document.createElement('div')
    groupbuttonsTrack.classList.add('groupbuttonsTrack')

    albumCarousel.prepend(groupbuttonsTrack)
    carouselApi(tracksContainer, groupbuttonsTrack, tracksSection)

    return tracksSection

}

// Função para renderizar os álbuns
function renderAlbums(items) {
    // Cria o contêiner flexível para todos os itens
    const albumsContainer = document.createElement('div')
    albumsContainer.classList.add('album-container')
    albumsContainer.id = "albumsContainer"

    // Cria o título da seção
    const albumTitleapi = document.createElement('span')
    albumTitleapi.textContent = 'Albums'
    albumTitleapi.classList.add('search-titles')

    // Itera sobre os itens e crie cada item individualmente
    items.forEach(item => {
        const albumName = document.createElement('h3')
        albumName.textContent = item.name
        albumName.dataset.year = `${item.release_date}`
        albumName.id = `${item.id}`

        const totalTracks = document.createElement('p')
        totalTracks.textContent = `Faixas: ${item.total_tracks}`

        const selecteditemhover = document.createElement('div')
        selecteditemhover.classList.add('selecteditemhover')

        const albumContainerUnit = document.createElement('div')
        albumContainerUnit.classList.add('album-item')

        const imgContainerGroup = document.createElement('div')
        imgContainerGroup.classList.add('imgContainer-album')

        const albumImage = document.createElement('img')
        albumImage.alt = `Capa do álbum ${item.name}`

        if (item.images && item.images.length > 0) {
            albumImage.src = item.images[0].url
        } else {
            albumImage.src = '/assets/icon/vinylplaceholder.webp'
        }

        imgContainerGroup.append(albumImage)
        albumContainerUnit.append(imgContainerGroup, albumName, totalTracks)

        selecteditemhover.append(albumContainerUnit)

        // Adiciona o item ao contêiner flexível
        albumsContainer.append(selecteditemhover)
    })

    // 5. Crie um contêiner para a seção completa (título + carrossel)
    const albumSection = document.createElement('div')
    albumSection.classList.add('carousel-section') // Adicione uma classe para o container da seção
    albumSection.append(albumTitleapi, albumsContainer)
    /*container(efeito carrosel) / container(para butons)*/
    const groupbuttonsAlbums = document.createElement('div')
    groupbuttonsAlbums.classList.add('groupbuttonsAlbums')

    albumCarousel.prepend(groupbuttonsAlbums)
    carouselApi(albumsContainer, groupbuttonsAlbums, albumSection)

    // Retorna o contêiner completo para ser anexado ao DOM
    return albumSection
}

function renderArtists(items) {
    const artistsContainer = document.createElement('div')
    artistsContainer.classList.add('album-container')


    const artistsTitleapi = document.createElement('span')
    artistsTitleapi.textContent = 'Artists & Related'
    artistsTitleapi.classList.add('search-titles')

    items.forEach(item => {
        const artistName = document.createElement('h3')
        artistName.textContent = item.name

        const popularity = document.createElement('p')
        popularity.textContent = `Popularity: ${item.popularity}`

        const artistsContainerUnit = document.createElement('div')
        artistsContainerUnit.classList.add('artist-item')

        const selecteditemhover = document.createElement('div')
        selecteditemhover.classList.add('selecteditemhover')

        const imgContainerGroup = document.createElement('div')
        imgContainerGroup.classList.add('imgContainer')

        const artistImage = document.createElement('img')
        artistImage.alt = `Capa do álbum ${item.name}`

        if (item.images && item.images.length > 0) {
            artistImage.src = item.images[0].url
        } else {
            artistImage.src = '/assets/icon/vinylplaceholder.webp'
        }

        imgContainerGroup.append(artistImage)
        artistsContainerUnit.append(imgContainerGroup, artistName, popularity)

        selecteditemhover.append(artistsContainerUnit)

        // Adiciona o item ao contêiner flexível
        artistsContainer.append(selecteditemhover)
    })

    const artistsSection = document.createElement('div')
    artistsSection.classList.add('artists-carousel-section')

    artistsSection.append(artistsTitleapi, artistsContainer)

    const groupbuttonsArtist = document.createElement('div')
    groupbuttonsArtist.classList.add('groupbuttonsArtist')

    albumCarousel.prepend(groupbuttonsArtist)
    carouselApi(artistsContainer, groupbuttonsArtist, artistsSection)

    return artistsSection

}