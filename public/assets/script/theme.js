const themebtn = document.getElementById('theme-btn')
let clicked = 0

const apicontainer = document.querySelector('.search-apicontainer')
const headercontainer = document.querySelector('.header-css')
const playlistcontainer = document.querySelector('.my-playlist-li')
const librarycontainer = document.querySelector('.lib-musics-container')
const dinamiccontainer = document.querySelector('.dinamic-playlists')

themebtn.addEventListener('click', () => {
    
    if(clicked === 0){
        apicontainer.classList.add('bg-theme-api')
        headercontainer.classList.add('bg-theme-header')
        playlistcontainer.classList.add('bg-theme-playlist')
        librarycontainer.classList.add('bg-theme-library')
        dinamiccontainer.classList.add('bg-theme-dinamic')
        clicked = 1

    }else{
        apicontainer.classList.remove('bg-theme-api')
        headercontainer.classList.remove('bg-theme-header')
        playlistcontainer.classList.remove('bg-theme-playlist')
        librarycontainer.classList.remove('bg-theme-library')
        dinamiccontainer.classList.remove('bg-theme-dinamic')
        clicked = 0
    }
    
})

