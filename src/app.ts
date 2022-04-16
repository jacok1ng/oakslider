'use strict'

import { data } from '../assets/images.json'
import { ImageAsset, MoveDirection, useAnimateSlide } from './shared'
import { useCustomForm } from './shared/customForm'

//Variables
let assets: ImageAsset[] = data
const { init, setAnimDuration, setSlideDuration } = useAnimateSlide({
  assets,
})
const { init: formInit } = useCustomForm({ setAnimDuration, setSlideDuration })

init()
formInit()
