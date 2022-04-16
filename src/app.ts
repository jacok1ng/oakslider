'use strict'

import { data } from '../assets/images.json'
import { ImageAsset, MoveDirection, useAnimateSlide } from './shared'

//Handlers
const right = document.querySelector('.right')
const left = document.querySelector('.left')

//Variables
let assets: ImageAsset[] = data
const { moveSlide, init, restartTimer } = useAnimateSlide({
  assets,
})

init()

//Events
right.addEventListener('click', () => {
  restartTimer()
  moveSlide(MoveDirection.Right)
})

left.addEventListener('click', () => {
  restartTimer()
  moveSlide(MoveDirection.Left)
})
