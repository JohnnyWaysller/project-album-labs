let currentAccessToken = null
let tokenExpiryTime = 0


/**
 * @description Obtém o Access Token usando o Client Credentials Flow.
 * Este token é usado para acessar endpoints públicos da API do Spotify.
 * @returns {Promise<string|null>} O Access Token ou null em caso de erro.
 */

async function getAcessClientToken() {
    const spotifyClientId = process.env.API_CLIENT_ID
    const spotifyClientSecret = process.env.API_CLIENT_SECRET

    console.log('client id:', spotifyClientId)

    if (!spotifyClientId || !spotifyClientSecret) {
        console.error("Erro: API_CLIENT_ID ou API_CLIENT_SECRET não definidos no .env")
        return null
    }

    // Codifica as credenciais em Base64 para o cabeçalho Authorization
    // Isso transforma "API_CLIENT_ID:API_CLIENT_SECRET" em uma string Base64

    const authString = Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString('base64')

    try {
        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + authString
            },
            body: new URLSearchParams({
                'grant_type': 'client_credentials'
            })

        })

        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Erro ao obter acess Token: ${response.status} - ${errorText}`)
        }

        const data = await response.json()
        currentAccessToken = data.access_token

        // Date.now() retorna milissegundos, então multiplicamos expires_in por 1000.
        tokenExpiryTime = Date.now() + (data.expires_in * 1000)

        console.log("Novo token obtido e cacheado. Expira em:", new Date(tokenExpiryTime).toLocaleTimeString())
        return currentAccessToken

    } catch (error) {
        console.error('Erro na requisicao para obter Token', error.message) 
        currentAccessToken = null // Limpa o token se houver erro
        tokenExpiryTime = 0
        return null
    }

}

/**
 * @description Gerencia a obtenção e o cache do Access Token.
 * Esta é a função que as outras partes do seu código devem chamar para obter um token válido.
 * @returns {Promise<string|null>} Um Access Token válido ou null em caso de falha.
 */

async function getValidAccessToken() {
    // Verifica se já temos um token cacheado E se ele ainda não expirou
    if (currentAccessToken && Date.now() < tokenExpiryTime) {
        console.log("Usando token existente do cache (válido).")
        return currentAccessToken
    }

    // Se o token expirou ou não existe, obtém um novo
    console.log("Token expirado ou não existente. Solicitando novo token...")
    return await getAcessClientToken() // Chama a função que faz a requisição real
}

module.exports = getValidAccessToken