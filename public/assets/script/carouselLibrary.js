

const prevBtn = document.getElementById('prev-btn')
const nextBtn = document.getElementById('next-btn')

const renderdivContainer = document.getElementById('playlist-container')

/*variaveis de controle para carrossel*/

let currentPosition = 0
const itemWidth = 150 /*largura item (cada playlist em .playlists-mylibrary)*/
const itemGap = 32 /*Espaçamento entre os itens (#playlist-container)*/
const moveValue = itemWidth + itemGap //valor que sera movido

function carouselpositionUpdate() {
    //atualiza posicao do carrosel
    renderdivContainer.style.transform = `translateX(-${currentPosition}px)`
}

if (prevBtn && nextBtn && renderdivContainer) { //se elementos existem
    nextBtn.addEventListener('click', nextClick)
    prevBtn.addEventListener('click', prevClick)
}
 
//ao clicar next
function nextClick() {
    //pega toda largura do container que desliza
    const totalcontentWidth = renderdivContainer.scrollWidth
    //pega largura total visivel no container pai do carousel
    const carouselWrapperWidth = renderdivContainer.parentElement.clientWidth

    if(totalcontentWidth <= carouselWrapperWidth){
        currentPosition = 0
        carouselpositionUpdate()
        return
    }

    let newPosition = currentPosition + moveValue
    const maxPosition = totalcontentWidth -  carouselWrapperWidth

    if(newPosition > maxPosition){
        newPosition = maxPosition
    }

    currentPosition = newPosition + itemGap
    carouselpositionUpdate()
}

function prevClick(){
    currentPosition -= moveValue

    if(currentPosition < 0){
        currentPosition = 0
    }

    carouselpositionUpdate()
}



