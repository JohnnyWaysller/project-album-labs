const express = require('express')
const playlistControler = require('./controllers/playlistControler')
const spotifyController = require('./controllers/spotfyControler')

const router = express.Router()




//get Home
router.get('/', (req, res) => res.render('home'))

//get spotfyacess to test
router.get('/spotify/search', spotifyController.search)
//get aplication api
router.get('/spotify/search/:query', spotifyController.generalSearch)

// searchArtist api from Genre
router.get('/spotify/searchArtist/artist/:id', spotifyController.searchArtistwithId)

//get artist aplication api
router.get('/spotify/searchArtist/:artist', spotifyController.searchArtist)


//get track aplication api
router.get('/spotfy/searchTrack/:id', spotifyController.searchTrack)

// searchAlbum api
router.get('/spotify/searchAlbum/:id/tracks', spotifyController.searchAlbum)


//get myLibrary
router.get('/myLibrary', playlistControler.myLibrary)

//post newplaylist(library)
router.post('/newplaylist',playlistControler.sendnewPlaylist)

//get
router.get('/myLibrary/playlist/:id',playlistControler.getspecificPlaylist)

//post mylibrary add track to My musics
router.post('/myLibrary/tracks/', playlistControler.saveSongtoMymusics)

//post mylibrary add music to Playlist
router.post('/myLibrary/musicToPlaylist/', playlistControler.saveMusictoPlaylist)

//post (delete com corpo requisicao)
router.post('/myLibrary/delete/', playlistControler.deleteSongsfromPlaylist)

//put (delete com corpo requisicao)
router.put('/myLibrary/editplaylist/:id', playlistControler.editPlaylistname)

router.delete('/myLibrary/myMusic/delete/:id', playlistControler.deleteSongFromAllMusics)

router.delete('/myLibrary/delete/playlist/:id', playlistControler.deletePlaylist)

module.exports = router