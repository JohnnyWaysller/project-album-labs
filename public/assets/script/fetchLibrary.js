/*requisicao insercao unica de playlist*/
export async function fetchcreatePlaylist(playlistname) {
    try {
        const response = await fetch('http://localhost:3000/newplaylist', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ name: playlistname })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'erro desconhecido !' }))
            throw new Error(errorData.message || `Erro do servidor Status: ${response.status}`)
        }
        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel realizar requisição (enviar nome da nova playlist)')
        throw error
    }
}

/*requisicao obter unica de playlist*/
export async function fetchtargetPlaylist(id) {
    try {
        const response = await fetch(`http://localhost:3000/myLibrary/playlist/${id}`, {
            method: 'GET'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'erro desconhecido !' }))
            throw new Error(`error Status: ${response.status}, Message: ${errorData.message || 'erro Desconhecido'}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error(`Erro ao buscar playlist: ${error}`)
        throw error

    }
}

//req para adicionar musica a playlist existente
export async function fetchAddmusicToplaylist(seletedPlaylistId, musicToPlaylist, genres = null) {
    try {
        const response = await fetch(`http://localhost:3000/myLibrary/musicToPlaylist/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ idToFind: seletedPlaylistId, music: musicToPlaylist, genres: genres })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'erro desconhecido !' }))
            throw new Error(errorData.message || `Erro do servidor Status: ${response.status}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel realizar requisição (enviar musicas à playlist)')
        throw error
    }

}

//deletar musica especifica(da playlist)(obs post, pois utiliza multiplo parametro)
export async function fetchdeleteSongtoPlaylist(id, indexArr) {
    try {
        const response = await fetch(`http://localhost:3000/myLibrary/delete/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ idToFind: id, musicIndexs: indexArr })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'erro desconhecido !' }))
            throw new Error(errorData.message || `Erro do servidor Status: ${response.status}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel realizar requisição de Exclusão!)')
        throw error
    }
}

export async function fetchAddsongtoMymusics(trackObject) {
    try {
        const response = await fetch(`http://localhost:3000/myLibrary/tracks/`, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify({ trackObject: trackObject })
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'erro desconhecido !' }))
            throw new Error(errorData.message || `Erro do servidor Status: ${response.status}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel realizar requisição POST song!)')
        throw error
    }
}

