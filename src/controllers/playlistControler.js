const playlistModels = require('../models/playlistModel')

const playlistControler = {

    //todas playlists para renderizar em library.ejs
    myLibrary: (req, res) => {
        const allplaylistsArr = playlistModels.getallPlaylists()
        const allmusics = playlistModels.getallMusics()
        res.render('library', { allplaylistsArr, allmusics })
    },

    //envio de nova playlist pelo front
    sendnewPlaylist: (req, res) => {
        try {
            const { name } = req.body
            if (!name) {
                return res.status(400).json({ message: 'O nome da playlist é obrigatorio' })
            }
            const newplaylistsaved = playlistModels.includePlayList(name)
            //retorna resposta com o objeto playlist para requisicao fetch/front
            res.status(201).json({ message: `nova playlist [${newplaylistsaved.name}] foi salva com sucesso `, playlist: newplaylistsaved })

        } catch (error) {
            console.error(`Erro ao criar a playlist, Controler erro: ${error}`)
            res.status(500).json({ message: `erro interno do servidor ao criar playlist` })
        }
    },

    //playlist especifica pelo id (front)
    getspecificPlaylist: (req, res) => {
        try {
            const { id } = req.params
            const playlist = playlistModels.getPlaylist(id)

            if (!playlist) {
                return res.status(404).json({ message: `Playlist não encontrada.` })
            }
            res.status(200).json(playlist)

        } catch (error) {
            console.error(`Erro ao buscar playlist: ${error}`)
            res.status(500).json({ message: `Erro interno do servidor ao buscar playlist` })
        }
    },

    //req salvar musica para playlist
    saveMusictoPlaylist: (req, res) => {
        const { idToFind, music, genres } = req.body
        playlistModels.includeSongtoPlaylist(idToFind, music, genres)
        res.status(200).json({ message: 'Dados recebidos com sucesso pelo backend!' })
    },

    saveSongtoMymusics:(req, res) => {
        const { trackObject } = req.body
        const result = playlistModels.includetracktoSongs(trackObject)

        if(result.success){
            res.status(201).json({ message: result.message })
        }else{
            res.status(409).json({message: result.message})
        }
    },

    deleteSongsfromPlaylist: (req, res) => {
        const { idToFind, musicIndexs } = req.body
        playlistModels.removeSongs(idToFind, musicIndexs)

        res.status(200).json({ message: 'Dados para exclusao recebidos com sucesso pelo backend!' })
    },

    deleteSongFromAllMusics: (req, res) => {
        const { id } = req.params
        playlistModels.deleteSongMyAllMusic(String(id))
        res.status(200).json({ message: 'Exclusao efetuada com sucesso pelo backend!' })
    },

    deletePlaylist: (req, res) => {
        const { id } = req.params
        playlistModels.deleteSelectedPlaylist(String(id))
        res.status(200).json({ message: 'Exclusao efetuada com sucesso pelo backend!' })
    },

    editPlaylistname: (req, res) => {
        const { id } = req.params
        const { name } = req.body
       playlistModels.editplaylistTitle(id, name)
        res.status(200).json({ message: 'Alteracao efetuada com sucesso pelo backend!' })
    }
}



module.exports = playlistControler