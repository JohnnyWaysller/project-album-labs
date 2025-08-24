function closeLayout(container) {
    animateElementOut(container)
}

function animateElementOut(element, containerClassRef, removeElement) {
    let remove = removeElement
    const finalClassName = containerClassRef || 'divAnimate'
    
    if(!element.classList.contains('search-apicontainer')){
        //bloco especifico para carousel da classe !
        //demais elementos utiliza innerHtml
        element.innerHTML = ''
    }

    element.classList.add(finalClassName, 'exiting')
    void element.offsetWidth

    element.classList.remove('exiting')
    element.classList.add('exited')

    const handleTransitionEnd = function () {
        element.removeEventListener('transitionend', handleTransitionEnd)
        element.classList.remove('exited', finalClassName)
        if (remove) {
            element.remove()
        } else {
            element.classList.remove('display-flex-class')
        }
    }
    element.addEventListener('transitionend', handleTransitionEnd)
}

function openLayout(container, ...content) {

    let containertoRender = container
    content.forEach(element => {
        containertoRender.appendChild(element)
    })
    animateElement(containertoRender, 950)
}

function animateElement(element, transitionDuration = 700, divRef = '') {
    if (divRef === '') {
        element.classList.add('divAnimate', 'entering')
    } else {
        element.classList.add(`${divRef}`, 'entering')
    }

    void element.offsetWidth
    element.classList.remove('entering')
    element.classList.add('entered')

    const handleTransitionEnd = function () {
        element.removeEventListener('transitionend', handleTransitionEnd)
        element.classList.remove('entered') // Opcional: remover 'entered' após a animação
        if (divRef === '') {
            element.classList.remove('divAnimate')
        } else {
            element.classList.remove(`${divRef}`) // Opcional: remover a classe base de animação
        }
    }
    element.addEventListener('transitionend', handleTransitionEnd)

    const timeoutId = setTimeout(() => {
        if (element.classList.contains('entered')) {
            handleTransitionEnd()
        }
    }, transitionDuration + 50)

    element.addEventListener('transitionend', () => clearTimeout(timeoutId), { once: true })
}

/*funcao animacao de botao*/

function animateButton(btn, transitionDuration = 700) {

    btn.classList.add('btnAnimate', 'enteringBtn')
    void btn.offsetWidth
    btn.classList.remove('enteringBtn')
    btn.classList.add('enteredBtn')

    const handleTransitionEnd = function () {
        btn.removeEventListener('transitionend', handleTransitionEnd)
        btn.classList.remove('enteredBtn') // Opcional: remover 'enteredBtn' após a animação
        btn.classList.remove('btnAnimate') // Opcional: remover a classe base de animação
    }
    btn.addEventListener('transitionend', handleTransitionEnd)
    const timeoutId = setTimeout(() => {
        if (btn.classList.contains('enteredBtn')) {
            handleTransitionEnd()
        }
    }, transitionDuration + 50)

    btn.addEventListener('transitionend', () => clearTimeout(timeoutId), { once: true })
}


export { closeLayout, openLayout, animateElement, animateButton, animateElementOut }


/*ajustar redimensionamento das divs*/
// Obtém as referências para as divs 
const divPlaylist = document.querySelector('.dinamic-playlists')//esquerda
const divMusics = document.querySelector('.lib-musics-container')//div meio
const divApi = document.querySelector('#album-carousel')//div direita
const newplaylistcontainer = document.querySelector('#divToFill')

function ajustarLayout() {
    //Verifica se as divs do meio e da direita existem na página
    const divsVisible = divMusics && (divApi && divApi.children.length > 0)
    const allrendered = (newplaylistcontainer.children.length > 0) && divsVisible

    //Verifica se a tela é pequena (por exemplo, abaixo de 600px)
    const lowerScreen = window.innerWidth <= 750
    const shortScreen = window.innerWidth <= 1200
    const shortsecondScreen = window.innerWidth <= 1400

    //Se as duas condições forem verdadeiras, adicione a classe para esconder a div.
    //    Caso contrário, remova a classe.
    if (divsVisible && shortScreen) {
        divPlaylist.classList.add('screen-hide')
    } else if (allrendered && shortsecondScreen) {
        divPlaylist.classList.add('screen-hide')
    } else {
        divPlaylist.classList.remove('screen-hide')
    }

    if (lowerScreen && (divApi.children.length > 0)) {
        newplaylistcontainer.classList.add('newplaylist-hide')
    } else {
        newplaylistcontainer.classList.remove('newplaylist-hide')
    }
}
ajustarLayout()

// Adiciona um 'listener' para re-executar a função sempre que a janela for redimensionada
window.addEventListener('resize', ajustarLayout)