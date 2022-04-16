'use strict'

import { data } from '../assets/images.json'
import { ImageAsset, MoveDirection, useAnimateSlide } from './shared'

//Handlers
const currentPhoto: HTMLImageElement = document.querySelector('.photo')
const nextPhoto: HTMLImageElement = document.querySelector('.next-photo')
const previousPhoto: HTMLImageElement =
  document.querySelector('.previous-photo')
const right = document.querySelector('.right')
const left = document.querySelector('.left')

//Variables

let assets: ImageAsset[] = data
let timer: number | null = null
let intervalTime = 3500
const { moveSlide, updateMenu } = useAnimateSlide({ assets, restartTimer })

initSlider()

right.addEventListener('click', () => {
  restartTimer()
  moveSlide(MoveDirection.Right)
})

left.addEventListener('click', () => {
  restartTimer()
  moveSlide(MoveDirection.Left)
})

function restartTimer() {
  clearInterval(timer)
  timer = setInterval(() => {
    moveSlide(MoveDirection.Right)
  }, intervalTime)
}

function initSlider() {
  //Reset variables
  previousPhoto.src = assets[assets.length - 1].src
  currentPhoto.src = assets[0].src
  nextPhoto.src = assets[1].src

  //Insert pagination
  updateMenu()

  //Interval
  timer = setInterval(() => {
    moveSlide(MoveDirection.Right)
  }, intervalTime)
}
