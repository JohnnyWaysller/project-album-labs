import { apisearchartistContent, apisearchalbumContent } from './fetchApi.js'
//funcao para selecionar item clicado e capturar nome para pos requisicao

const artistContainerSelected = document.getElementById('album-carousel')

artistContainerSelected.addEventListener('click', async (event) => {

    const selectedContainerArtistItem = event.target.closest('.artist-item')

    const selectedContainerAlbumItem = event.target.closest('.album-item')



    if (selectedContainerArtistItem) {
        const artistnameTarget = selectedContainerArtistItem.querySelector('h3')

        if (artistnameTarget) {
            try {
                const data = await apisearchartistContent(artistnameTarget.textContent)
                const albums = data.albums.items
                if (albums && albums.length > 0) {
                    rendernewAlbums(albums)
                }
            } catch (error) {
                console.error("Erro ao buscar novos albums da API:", error)
                alert("Ocorreu um erro ao buscar os dados. Tente novamente.")
            }
        }

    } else if (selectedContainerAlbumItem) {
        const albumTargetItemId = selectedContainerAlbumItem.querySelector('h3').id
        const albumName = selectedContainerAlbumItem.querySelector('h3').textContent
        //necessario para passar atributo data-year (em rendernewAlbums)
        const albumTarget = selectedContainerAlbumItem.querySelector('h3')
        const year = albumTarget.dataset.year
        const albumImageSource = selectedContainerAlbumItem.querySelector('img').src
        

        if (albumTargetItemId) {

            try {

                const data = await apisearchalbumContent(albumTargetItemId)

                const tracks = data.items

                if (tracks && tracks.length > 0) {
                    console.log(`Teste ${year}`)
                    rendernewTracks(tracks, albumName, year, albumImageSource)
                }


            } catch (error) {
                console.error("Erro ao buscar novos albums da API:", error)
                alert("Ocorreu um erro ao buscar os dados. Tente novamente.")
            }

        }
        else {
            alert("requisicao de album nao foi realizada !")
        }
    }

})

function rendernewTracks(items, albumname, year, albumImageSource) {
    const tracksContainer = document.getElementById('tracksContainer')
    tracksContainer.innerHTML = ''

    items.forEach(item => {
        const trackName = document.createElement('h3')
        trackName.textContent = item.name

        const trackalbumName = document.createElement('p')
        trackalbumName.textContent = `Album: ${albumname} ${year}`

        const trackContainerUnit = document.createElement('div')
        trackContainerUnit.classList.add('track-item')
        trackContainerUnit.dataset.trackId = item.id

        const selecteditemhover = document.createElement('div')
        selecteditemhover.classList.add('selecteditemhover')

        const imgContainerGroup = document.createElement('div')
        imgContainerGroup.classList.add('imgContainer-track')

        const trackalbumImage = document.createElement('img')
        trackalbumImage.alt = `Capa do Album da Musica ${albumname}`

         if (albumImageSource) {
            trackalbumImage.src = albumImageSource
        } else {
            trackalbumImage.src = '/assets/icon/vinylplaceholder.webp'
        }

        imgContainerGroup.append(trackalbumImage)
        trackContainerUnit.append(imgContainerGroup, trackName, trackalbumName)
        selecteditemhover.append(trackContainerUnit)
        tracksContainer.append(selecteditemhover)
    })
}


function rendernewAlbums(items) {
    const albumsContainer = document.getElementById('albumsContainer')
    albumsContainer.innerHTML = ''

    items.forEach(item => {
        const albumName = document.createElement('h3')
        albumName.textContent = item.name
        albumName.id = `${item.id}`
        albumName.dataset.year = `${item.release_date}`

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
        //imagem na div
        imgContainerGroup.append(albumImage)
        //todos itens no agrupador
        albumContainerUnit.append(imgContainerGroup, albumName, totalTracks)

        selecteditemhover.append(albumContainerUnit)
        albumsContainer.append(selecteditemhover)
    })
}

