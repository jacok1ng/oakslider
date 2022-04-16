'use strict'

import { data } from '../assets/images.json'
import { useAnimateSlide } from './shared'

//Handlers
const currentPhoto = document.querySelector('.photo')
const nextPhoto = document.querySelector('.next-photo')
const previousPhoto = document.querySelector('.previous-photo')
const right = document.querySelector('.right')
const left = document.querySelector('.left')

//Variables
let assets = data
let timer = null
let intervalTime = 3500
const { moveSlide, updateMenu } = useAnimateSlide(assets)

initSlider()

function initSlider() {
  //Reset variables
  previousPhoto.src = assets[assets.length - 1].src
  currentPhoto.src = assets[0].src
  nextPhoto.src = assets[1].src

  //Insert pagination
  updateMenu()

  //Interval
  timer = setInterval(() => {
    moveSlide('right')
  }, intervalTime)
}

right.addEventListener('click', () => {
  clearInterval(timer)
  moveSlide('right')
  timer = setInterval(() => {
    moveSlide('right')
  }, intervalTime)
})

left.addEventListener('click', () => {
  clearInterval(timer)
  moveSlide('left')
  timer = setInterval(() => {
    moveSlide('right')
  }, intervalTime)
})
