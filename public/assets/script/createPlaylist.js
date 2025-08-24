import { fetchcreatePlaylist } from "./fetchLibrary.js"
import { renderlastCreated } from "./renderPlaylist.js"
import { animateElement, closeLayout, openLayout, animateButton } from "./layoutControl.js"

const newplayBtn = document.getElementById('newplaylistBtn')
const divTofillBefore = document.getElementById('divToFill-before')
newplayBtn.addEventListener('click', newplayList)

//container onde sera inserido elementos de preenchimento
const divtofill = document.getElementById('divToFill')
// divtofill.classList.add('entering')

function newplayList() {
    divtofill.classList.add('display-flex-class')
    // troca o display none para flex (css)
    // divtofill.style.display = 'flex'
    divtofill.style.backgroundColor = '#464545'

    //span p titulo
    const titlecreateplaylist = document.createElement('span')
    titlecreateplaylist.textContent = "Criar Playlist"
    titlecreateplaylist.classList.add('createplaylist-title')

    //criando elemento para prencher titulo da nova playlist
    const inputnewplaylist = document.createElement('input')
    inputnewplaylist.type = 'text'
    inputnewplaylist.placeholder = 'Insira o nome da playlist...'
    inputnewplaylist.classList.add('input-newPlaylist')
    inputnewplaylist.id = 'playlistInputId'

    //criando botoes para confirmar/cancelar
    const confirmBtn = document.createElement('button')
    confirmBtn.textContent = 'Criar'
    confirmBtn.classList.add('btn-confirm')
    const cancelBtn = document.createElement('button')
    cancelBtn.textContent = 'Cancelar'
    cancelBtn.classList.add('cancel-confirm')

    //remove botao newplaylist
    newplayBtn.parentNode.removeChild(newplayBtn)
    //ocultar propria div
    // const divTofillBefore = document.getElementById('divToFill-before')
    divTofillBefore.classList.add('divTofill-before-hidden')

    //criando container para agrupar botoes
    const buttonGroup = document.createElement('div')
    buttonGroup.classList.add('button-group')

    //adiciona eventos aos botoes
    confirmBtn.addEventListener('click', confirmNewPlaylist)
    cancelBtn.addEventListener('click', cancelNewPlaylist)

    buttonGroup.append(confirmBtn, cancelBtn)
    
    openLayout(divtofill,titlecreateplaylist,inputnewplaylist,buttonGroup)


    inputnewplaylist.focus()
}

async function confirmNewPlaylist() {
    //pega elemento criado previamente pelo id
    const inputnewplaylist = document.getElementById('playlistInputId')
    //verifica se existe
    if (inputnewplaylist) {
        const playlistName = inputnewplaylist.value.trim()
        inputnewplaylist.value = ''
        inputnewplaylist.focus()
        //verifica valor do input
        if (playlistName) { 
            try {
                //resposta obtida apos requisicao
                const newplaylistreturned = await fetchcreatePlaylist(playlistName)
                // console.log("confirmacao :",newplaylistreturned.playlist) 
                
                renderlastCreated(newplaylistreturned.playlist)

            } catch (error) {
                console.error(`Erro ao criar a playlist, ${error}`)
                alert(`Erro ao criar a playlist: ${error.message || "Erro desconhecido"}`)  
            }
        } else {
            alert(`O campo não pode estar vazio !`)
            inputnewplaylist.focus()
        }
    } else {
        alert(`Não foi possivel acessar o campo da playlist`)
    }
}

function cancelNewPlaylist() {
    if(divtofill){
            closeLayout(divtofill)
        console.log(`campo de insercao apagado`)
    }else{
        console.log(`campo de insercao inválido`)
    }
    divTofillBefore.classList.remove('divTofill-before-hidden')

    animateElement(divTofillBefore)
    divTofillBefore.appendChild(newplayBtn)
    animateButton(newplayBtn)
}


