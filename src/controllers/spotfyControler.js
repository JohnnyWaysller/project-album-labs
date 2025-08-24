const { searchSpotify, searchSpotifyAplication, searchArtistSpotifyAplication, searchTracksfromAlbum, searchTrackApi, searchArtistApifromGenre } = require('../api/apiServer.js')

// --- Métodos do Controller ---

const spotifyController = {
    // Método para lidar com a rota de busca no Spotify
    //teste
    search: async (req, res) => {
        const { q, type } = req.query

        if (!q || !type) {
            return res.status(400).json({ error: 'Parâmetros "q" (query) e "type" são obrigatórios.' })
        }

        try {
            // Agora, searchSpotify já cuida de obter o token válido internamente!
            const results = await searchSpotify(q, type)
            if (!results) {
                return res.status(500).json({ error: 'Erro ao buscar no Spotify. Verifique os logs do servidor.' })
            }

            res.json(results)

        } catch (error) {
            console.error("Erro inesperado no controller spotifyController.search:", error)
            res.status(500).json({ error: 'Erro interno do servidor ao processar a busca.' })
        }
    },

    generalSearch: async (req, res) => {
        const q = req.params.query

        if (!q) {
            return res.status(400).json({ error: 'Parâmetros "q" (query) e "type" são obrigatórios.' })
        }

        try {
            // Agora, searchSpotify já cuida de obter o token válido internamente!
            const results = await searchSpotifyAplication(q)
            if (!results) {
                return res.status(500).json({ error: 'Erro ao buscar no Spotify. Verifique os logs do servidor.' })
            }
            res.json(results)
        } catch (error) {
            console.error("Erro inesperado no controller spotifyController.generalSearch:", error)
            res.status(500).json({ error: 'Erro interno do servidor ao processar a busca.' })
        }
    },

    searchArtist: async (req, res) => {
        const artist = req.params.artist

        if (!artist) {
            return res.status(400).json({ error: 'Parâmetro "Artist" é obrigatorios. ' })
        }

        try {
            const artistreqResult = await searchArtistSpotifyAplication(artist)

            if (!artistreqResult) {
                return res.status(500).json({ error: 'Erro o buscar no Spotfy (artist) verifique logs' })
            }
            res.json(artistreqResult)

        } catch (error) {
            console.error("Erro inesperado no controller spotfyControler.searchArtist: ", error)
            res.status(500).json({ error: 'Erro interno do servidor ao processar a busca. ' })
        }
    },

    searchAlbum: async (req, res) => {
        const albumId = req.params.id

        if (!albumId) {
            return res.status(400).json({ error: 'Parâmetro albumId é obrigatorio' })
        }

        try {
            const albumreqResult = await searchTracksfromAlbum(albumId)

            if (!albumreqResult) {
                return res.status(500).json({ error: 'erro ao buscar no spotify (Albums) verifique os logs' })
            }
            res.json(albumreqResult)

        } catch (error) {
            console.error("Erro inesperado no controller spotifyControler.searchAlbum: ", error)
            res.status(500).json({ error: 'Erro interno do servidor na busca' })
        }
    },

    searchTrack: async ( req, res) => {
        const trackId = req.params.id
        if(!trackId){
            return res.status(400).json({ error: 'Parâmetro trackId é obrigatorio' })
        }
        try {
            const trackResult = await searchTrackApi(trackId)

            if(!trackResult){
                return res.status(500).json({ error: 'erro ao buscar no spotify (tracks) verifique os logs'})
            }
            res.json(trackResult)
            
        } catch (error) {
            console.error("Erro inesperado no controller spotifyControler.searchTrack: ", error)
            res.status(500).json({error: 'Erro interno do servidor na busca'})
        }
    },

    searchArtistwithId: async ( req, res) => {
        const artistId = req.params.id
        if(!artistId){
            return res.status(400).json({ error: 'Parâmetro artistId é obrigatorio' })
        }
        try {
            const artistResult = await searchArtistApifromGenre(artistId)

            if(!artistResult){
                return res.status(500).json({ error: 'erro ao buscar no spotify (artist) verifique os logs'})
            }
            res.json(artistResult)
            
        } catch (error) {
            console.error("Erro inesperado no controller spotifyControler.searchArtistwithId: ", error)
            res.status(500).json({error: 'Erro interno do servidor na busca'})
        }
    },

}

module.exports = spotifyController