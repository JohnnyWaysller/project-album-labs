
export function editplaylistName(playlistId, currentNameElement) {

    const modal = document.getElementById('editPlaylistModal')
    const input = document.getElementById('newPlaylistNameInput')
    const form = document.getElementById('editPlaylistForm')
    const closeBtn = document.getElementById('closeEditModal')
    const cancelBtn = document.getElementById('cancelEditBtn')
    const currentNameDisplay = document.getElementById('currentPlaylistName')

    modal.style.display = 'flex'
    currentNameDisplay.textContent = `Nome atual: ${currentNameElement.textContent}`
    input.value = currentNameElement.textContent
    input.focus()

    const closeModal = () => {
        modal.style.display = 'none'
        // Remove os listeners para evitar duplicação em cliques futuros
        form.removeEventListener('submit', handleFormSubmit)
        closeBtn.removeEventListener('click', closeModal)
        cancelBtn.removeEventListener('click', closeModal)
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault()

        const newName = input.value.trim()

        if (newName && newName !== currentNameElement.textContent) {
            try {
                // Requisição assíncrona para sua API
                const response = await fetch(`/myLibrary/editplaylist/${playlistId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ name: newName })
                })

                if (response.ok) {
                    const data = await response.json()
                    console.log('Playlist atualizada com sucesso:', data)
                    
                    // 5. Atualiza o nome na tela dinamicamente (Sem recarregar!)
                    currentNameElement.textContent = newName
                } else {
                    console.error('Erro na requisição:', response.statusText)
                }

            } catch (error) {
                console.error('Falha ao tentar editar playlist:', error)
            }
        }
        closeModal() // Fecha o modal após o envio (mesmo em caso de erro)
    }

    // 6. Adiciona os "ouvintes" de evento
    form.addEventListener('submit', handleFormSubmit)
    closeBtn.addEventListener('click', closeModal)
    cancelBtn.addEventListener('click', closeModal)
}