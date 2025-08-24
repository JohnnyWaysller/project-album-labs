//deletar uma musica pelo id em mymusics(banco)
export async function fetchDeleteSongMymusics(id) {
    try {
        const response = await fetch(`http://localhost:3000/myLibrary/myMusic/delete/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'erro desconhecido !' }))
            throw new Error(`error Status: ${response.status}, Message: ${errorData.message || 'erro Desconhecido'}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.error(`Erro na req de exclusao da musica: ${error}`)
        throw error

    }
}

//deletar playlist pelo id
export async function fetchdeletePlaylist(id) {
    try {
        const response = await fetch(`http://localhost:3000/myLibrary/delete/playlist/${id}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'erro desconhecido' }))
            throw new Error(errorData.message || `Erro do servidor status: ${errorData.status}`)
        }

        const data = await response.json()
        return data

    } catch (error) {
        console.log('Não foi possivel realizar requisicao de exclusao da playlist')
        throw error
    }
}