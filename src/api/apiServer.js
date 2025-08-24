const getValidAccessToken = require('./tokenControlApi.js')

/**
 * @description Realiza uma busca na API do Spotify.
 * @param {string} accessToken - O token de acesso obtido do Spotify.
 * @param {string} query - O termo de busca (ex: "rock", "Arctic Monkeys").
 * @param {string} type - O tipo de item a ser buscado (ex: "album", "artist", "track", "playlist").
 * @returns {Promise<object|null>} Os resultados da busca ou null em caso de erro.
 */
async function searchSpotify(query, type) { // Removemos o accessToken dos parâmetros, pois getValidAccessToken vai obtê-lo
    const accessToken = await getValidAccessToken() // <--- CHAMA A FUNÇÃO DE GERENCIAMENTO AQUI!
    if (!accessToken) {
        console.error("Não foi possível obter um token de acesso válido para a busca.")
        return null
    }

    const searchUrl = `https://api.spotify.com/v1/search` +
        `?q=${encodeURIComponent(query)}` +
        `&type=${encodeURIComponent(type)}`

    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken // Usa o token no cabeçalho Authorization
            }
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erro ao buscar no Spotify: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro na requisição de busca:", error.message)
        return null
    }
}



async function searchSpotifyAplication(query) { // Removemos o accessToken dos parâmetros, pois getValidAccessToken vai obtê-lo
    const accessToken = await getValidAccessToken() // <--- CHAMA A FUNÇÃO DE GERENCIAMENTO AQUI!
    if (!accessToken) {
        console.error("Não foi possível obter um token de acesso válido para a busca.")
        return null
    }
    const selectedType = 'artist,track,album' //parametro secundario da API

    const searchUrl = `https://api.spotify.com/v1/search` +
        `?q=${encodeURIComponent(query)}` +
        `&type=${encodeURIComponent(selectedType)}`

    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken // Usa o token no cabeçalho Authorization
            }
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erro ao buscar no Spotify: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro na requisição de busca:", error.message)
        return null
    }
}

async function searchArtistSpotifyAplication(query) { // Removemos o accessToken dos parâmetros, pois getValidAccessToken vai obtê-lo
    const accessToken = await getValidAccessToken() // <--- CHAMA A FUNÇÃO DE GERENCIAMENTO AQUI!
    if (!accessToken) {
        console.error("Não foi possível obter um token de acesso válido para a busca.")
        return null
    }
    const selectedType = 'album' //parametro secundario da API

    const searchUrl = `https://api.spotify.com/v1/search` +
        `?q=${encodeURIComponent(query)}` +
        `&type=${encodeURIComponent(selectedType)}`

    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken // Usa o token no cabeçalho Authorization
            }
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erro ao buscar no Spotify: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro na requisição de busca:", error.message)
        return null
    }
}


async function searchTracksfromAlbum(query) {
    const accessToken = await getValidAccessToken()

    if (!accessToken) {
        console.error("Não foi possível obter um token de acesso válido para a busca.")
        return null
    }
    const albumId = query
    const searchUrl = `https://api.spotify.com/v1/albums/${albumId}/tracks`

    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken // Usa o token no cabeçalho Authorization
            }
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erro ao buscar Album/Track no Spotify: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro na requisição de busca:", error.message)
        return null
    }
}

async function searchTrackApi(query) {
    const accessToken = await getValidAccessToken()

    if (!accessToken) {
        console.error("Não foi possível obter um token de acesso válido para a busca.")
        return null
    }
    const trackId = query
    const searchUrl = `https://api.spotify.com/v1/tracks/${trackId}`

    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken // Usa o token no cabeçalho Authorization
            }
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erro ao buscar Track no Spotify: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro na requisição de busca da track:", error.message)
        return null
    }
}

async function searchArtistApifromGenre(id) {
    const accessToken = await getValidAccessToken()

    if (!accessToken) {
        console.error("Não foi possível obter um token de acesso válido para a busca.")
        return null
    }
    const artistId = id
    const searchUrl = `https://api.spotify.com/v1/artists/${artistId}`

    try {
        const response = await fetch(searchUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + accessToken // Usa o token no cabeçalho Authorization
            }
        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erro ao buscar Artist no Spotify: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro na requisição de busca do artist:", error.message)
        return null
    }
}
module.exports = { searchSpotify, searchSpotifyAplication, searchArtistSpotifyAplication, searchTracksfromAlbum, searchTrackApi, searchArtistApifromGenre }
