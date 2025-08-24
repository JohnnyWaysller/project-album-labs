export function carouselApi(carouselContainer, containerforButton, section){

// const prevBtn = document.getElementById('prev-btn')
const prevBtn = document.createElement('button')
prevBtn.classList.add('album-prevbutton')
prevBtn.textContent = '<'
// const nextBtn = document.getElementById('next-btn')
const nextBtn = document.createElement('button')
nextBtn.classList.add('album-nextbutton')
nextBtn.textContent = '>'

const renderdivContainer = carouselContainer



containerforButton.prepend(prevBtn,nextBtn)

// logica para ocultar deixar visivel botoes
const albumCarousel = document.getElementById('album-carousel')


if(section){
    section.addEventListener('mouseenter', () => {
        prevBtn.style.visibility = 'visible'
        nextBtn.style.visibility = 'visible'
    })

    albumCarousel.addEventListener('mouseleave', () => {
        prevBtn.style.visibility = 'hidden'
        nextBtn.style.visibility = 'hidden'
    })
}

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


}



