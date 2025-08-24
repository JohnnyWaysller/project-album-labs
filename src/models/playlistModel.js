 
let playlists = [
    {
        id: 1, name: 'Antigas',
        tags: ["rock", "classic"],
        musics: [
            {
                id: 1,
                title: 'master of puppets',
                year: '1986', artist: 'Metallica',
                album: 'master of puppets'
            },
            {
                id: 2,
                title: 'painkiller',
                year: '1990',
                artist: 'Judas Priest',
                album: 'painkiller'
            },
            {
                id: 3,
                title: 'holy wars... the punishment due',
                year: '1990',
                artist: 'Megadeth',
                album: 'rust in peace'
            }
        ]
    },
    { id: 2, name: 'Novas', tags: [], musics: [] },
    { id: 3, name: 'Para treinar', tags: [], musics: [] }]

let songs = [{
    id: 1,
    title: 'master of puppets',
    year: '1986', artist: 'Metallica',
    album: 'master of puppets'
},
{
    id: 2,
    title: 'painkiller',
    year: '1990',
    artist: 'Judas Priest',
    album: 'painkiller'
},
{
    id: 3,
    title: 'holy wars... the punishment due',
    year: '1990',
    artist: 'Megadeth',
    album: 'rust in peace'
}]

const playlistModels = {

    includePlayList(name) { /*funcao usada pelo botao nova playlist*/
        const playlistsave = {
            id: Math.random().toString(36).substring(2),
            name,
            tags: [],
            musics: []
        }

        playlists.push(playlistsave)
        return playlistsave
    },
    getallPlaylists() {
        return playlists
    },

    getallMusics() {
        return songs
    },
    getPlaylist(id) {
        return playlists.find(playlist => (playlist.id).toString() === id)
    },

    includeSongtoPlaylist(playlistId, songToSave, genres) {
        const playlistIndex = playlists.findIndex(playlist => String(playlistId) === String(playlist.id))
        if (playlistIndex === -1) {
            console.error("playlist nao encontrada")
            return
        }
        playlists[playlistIndex].musics.unshift(songToSave)
        if (genres) {
            genres.forEach(genre => {
                if (!playlists[playlistIndex].tags.includes(genre)) {
                    playlists[playlistIndex].tags.unshift(genre)
                }
            })
        }
    },

    includetracktoSongs(trackObject) {
        let exists = false
        songs.forEach(song => {
            if (song.id === trackObject.id) {
                exists = true
            }
        })
        if (!exists) {
            songs.unshift(trackObject)
            return { success: true, message: 'Música adicionada com sucesso.' }
        } else {
            return { success: false, message: 'Música já existe na lista de músicas.' }
        }
    },

    removeSongs(id, indexs) {
        //encontrar indice da playlist
        const playlistIndex = playlists.findIndex(playlist => String(id) === String(playlist.id))

        const originalMusicsArr = playlists[playlistIndex].musics
        const newMusicsArr = []

        const indexsSet = new Set(indexs)
        originalMusicsArr.forEach((element, i) => {
            if (!indexsSet.has(i)) { // revisar para estudo
                newMusicsArr.push(originalMusicsArr[i])
            }
        })

        playlists[playlistIndex].musics = newMusicsArr
    },

    deleteSongMyAllMusic(id) {
        songs = songs.filter(music => String(music.id) !== id)

    },

    deleteSelectedPlaylist(id) {
        playlists = playlists.filter(playlist => String(playlist.id) !== id)
    },
    editplaylistTitle(id, name) {
        const playlistIndex = playlists.findIndex(playlist => String(id) === String(playlist.id))
        playlists[playlistIndex].name = name
    }

}

module.exports = playlistModels