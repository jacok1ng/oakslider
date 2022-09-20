import { data } from '../assets/images.json'
import { useAnimateSlide } from './animateSlide'
import { useCustomForm } from './customForm'
import { ImageAsset } from './types'

//Variables
let assets: ImageAsset[] = data
const { init, setAnimDuration, setSlideDuration } = useAnimateSlide({
  assets,
})
const { init: formInit } = useCustomForm({
  setAnimDuration,
  setSlideDuration,
  assets,
})

init()
formInit()
