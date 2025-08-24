export async function apisearchGeralContent(param) {
    try {
        const response = await fetch(`http://localhost:3000/spotify/search/${param}`, {
            method: 'GET'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'erro desconhecido !'
            }))
            throw new Error(`error Status: ${response.status}, Message: ${errorData.message || 'erro Desconhecido'}`)
        }
        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel completar requisição')
        throw error
    }
}

export async function apisearchartistContent(artist) {
    try {
        const response = await fetch(`http://localhost:3000/spotify/searchArtist/${artist}`, {
            method: 'GET'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'erro desconhecido !'
            }))
            throw new Error(`error Status: ${response.status}, Message: ${errorData.message || 'erro Desconhecido'}`)
        }
        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel completar requisição de apisearchartistContent')
        throw error
    }
}

export async function apisearchalbumContent(id) {
    try {
        const response = await fetch(`http://localhost:3000/spotify/searchAlbum/${id}/tracks`, {
            method: 'GET'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'erro desconhecido !'
            }))
            throw new Error(`error Status: ${response.error}, Message: ${errorData.message || 'erro Desconhecido'}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel completar requisicao de apisearchalbumContent ')
        throw error
    }
}

export async function apisearchtrackContent(id) {
    try {
        const response = await fetch(`http://localhost:3000/spotfy/searchTrack/${id}`, {
            method: 'GET'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'erro desconhecido !'
            }))
            throw new Error(`error status: ${response.error}, Message: ${errorData.message}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel completar requisicao de apisearchtarck ')
        throw error
    }
}

export async function apisearchartistdata(id) {
    try {
        const response = await fetch(`http://localhost:3000/spotify/searchArtist/artist/${id}`, {
            method: 'GET'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({
                message: 'erro desconhecido !'
            }))
            throw new Error(`error status: ${response.error}, Message: ${errorData.message}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel completar requisicao de apisearchtartistdata ')
        throw error
    }
}