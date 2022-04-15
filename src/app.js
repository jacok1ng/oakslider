'use strict'

import { data } from '../assets/images.json'

//Handlers
const pagination = document.querySelector('.pagination')
const currentPhoto = document.querySelector('.photo')
const nextPhoto = document.querySelector('.next-photo')
const right = document.querySelector('.right')
const left = document.querySelector('.left')

//Variables
let assets = data
let indexOfPhoto = 0
let timer = null

initSlider()

function initSlider() {
  //Reset variables
  indexOfPhoto = 0
  currentPhoto.src = assets[0].src
  nextPhoto.src = assets[1].src

  //Insert pagination
  updateMenu()

  //Interval
  timer = setInterval(() => {
    currentPhoto.classList.toggle('moveToLeft')
    nextPhoto.classList.toggle('moveToLeft2')
  }, 2000)
}

currentPhoto.addEventListener('animationend', () => {
  assets[indexOfPhoto % assets.length].inUse = false
  assets[(indexOfPhoto + 1) % assets.length].inUse = true

  currentPhoto.classList.toggle('moveLeft')
  nextPhoto.classList.toggle('moveLeft2')

  indexOfPhoto++

  //Change photos
  currentPhoto.src = assets[indexOfPhoto % assets.length].src
  nextPhoto.src = assets[(indexOfPhoto + 1) % assets.length].src

  updateMenu()
})

left.addEventListener('click', () => {
  clearInterval(timer)
  timer = setInterval(() => {
    currentPhoto.classList.toggle('moveToLeft')
    nextPhoto.classList.toggle('moveToLeft2')
  }, 2000)
  anim('left')
})

currentPhoto.onfinish = () => console.log('finish')

function updateMenu() {
  pagination.innerHTML = `${assets
    .map(({ inUse }) =>
      inUse
        ? '<i class="fa-solid fa-circle clickable"></i>'
        : '<i class="fa-solid fa-circle-notch clickable"></i>'
    )
    .join('')}`
}

const anim = direction => {
  if (direction === 'left') {
    currentPhoto.animate({ transform: `translateX(-100%)` }, { duration: 2000 })
    nextPhoto.animate({ transform: `translateX(0%)` }, { duration: 2000 })
  }
  if (direction === 'right') {
    currentPhoto.animate({ transform: `translateX(100%)` }, { duration: 2000 })
    nextPhoto.animate({ transform: `translateX(0%)` }, { duration: 2000 })
  }
}
