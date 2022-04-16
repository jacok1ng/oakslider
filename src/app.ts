'use strict'

import { data } from '../assets/images.json'
import { ImageAsset, MoveDirection, useAnimateSlide } from './shared'
import { useCustomForm } from './shared/customForm'

//Handlers
const right = document.querySelector('.right')
const left = document.querySelector('.left')

//Variables
let assets: ImageAsset[] = data
const { moveSlide, init, restartTimer, setAnimDuration, setSlideDuration } =
  useAnimateSlide({
    assets,
  })
const { init: formInit } = useCustomForm({ setAnimDuration, setSlideDuration })

init()
formInit()

//Events
right.addEventListener('click', () => {
  restartTimer()
  moveSlide(MoveDirection.Right)
})

left.addEventListener('click', () => {
  restartTimer()
  moveSlide(MoveDirection.Left)
})
