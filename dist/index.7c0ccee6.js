'use strict';
//Handlers
const pagination = document.querySelector('.pagination');
const currentPhoto = document.querySelector('.photo');
const nextPhoto = document.querySelector('.next-photo');
//Variables
let pag = [];
const MAX_SLIDES = 3;
let indexOfPhoto = 0;
const getData = async ()=>{
    const d = await data();
    pag = d;
};
initSlider();
async function initSlider() {
    await getData();
    console.log(pag);
    //Reset variables
    indexOfPhoto = 0;
    currentPhoto.src = pag[0].src;
    nextPhoto.src = pag[1].src;
    //Insert pagination
    updateMenu();
    //Interval
    setInterval(()=>{
        currentPhoto.classList.toggle('moveToLeft');
        nextPhoto.classList.toggle('moveToLeft2');
    }, 3000);
}
currentPhoto.addEventListener('animationend', ()=>{
    pag[indexOfPhoto].inUse = false;
    pag[indexOfPhoto + 1].inUse = true;
    currentPhoto.classList.toggle('moveLeft');
    nextPhoto.classList.toggle('moveLeft2');
    indexOfPhoto++;
    //Change photos
    currentPhoto.src = pag[indexOfPhoto % MAX_SLIDES].src;
    nextPhoto.src = pag[(indexOfPhoto + 1) % MAX_SLIDES].src;
    updateMenu();
});
async function data() {
    const response = await fetch('http://127.0.0.1:8080/assets/images.json');
    const { data: data1  } = await response.json();
    return data1;
}
function updateMenu() {
    pagination.innerHTML = `${pag.map(({ inUse  })=>inUse ? '<i class="fa-solid fa-circle clickable"></i>' : '<i class="fa-solid fa-circle-notch clickable"></i>'
    ).join('')}`;
}

//# sourceMappingURL=index.7c0ccee6.js.map
