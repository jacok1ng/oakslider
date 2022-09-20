import { ImageAsset } from './types'

interface CustomFormProps {
  setAnimDuration: (time: number) => void
  setSlideDuration: (time: number) => void
  assets: ImageAsset[]
}

export const useCustomForm = ({
  setAnimDuration,
  setSlideDuration,
  assets,
}: CustomFormProps) => {
  const slideDuration: HTMLInputElement =
    document.querySelector('#slide-duration')!
  const animDuration: HTMLInputElement =
    document.querySelector('#anim-duration')!
  const customBtn = document.querySelector('.btn-custom')!
  const imgBtn = document.querySelector('.img-btn')!
  const revealMenu = document.querySelector('.reveal-menu')!
  const slideBtn = document.querySelector('.apply-slide')!
  const animBtn = document.querySelector('.apply-anim')!
  const overlay = document.querySelector('.overlay')!
  const itemContainer = document.querySelector('.item-container')!

  const init = () => {
    imgBtn.addEventListener('click', (e) => {
      e.preventDefault()
      overlay.classList.add('show')

      console.log('elo')

      assets.forEach((asset) => {
        const el = document.createElement(`<div class="item-container">
        <div class="item-image">
          <img
            class="image"
            src="${asset.src}"></img>
            alt="listitem"
          />
        </div>
        <div class="item-name">${asset.name}</div>
        <div class="item-delete clickable">
          <i class="fa-solid fa-trash"></i>
        </div>
      </div>`)
        itemContainer.insertAdjacentElement('afterbegin', el)
      })
    })

    overlay.addEventListener('click', () => {
      overlay.classList.remove('show')
    })

    customBtn.addEventListener('click', () => {
      revealMenu.classList.toggle('hide')
    })

    slideBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const { value } = slideDuration
      const parsedValue = parseInt(value)
      if (!value && !Number.isInteger(parsedValue) && parsedValue > 0)
        return alert('This number is not allowed!')
      setSlideDuration(parsedValue)

      //Add class
      slideBtn.classList.add('accept-btn')
      setTimeout(() => {
        slideBtn.classList.remove('accept-btn')
        slideDuration.placeholder = `Current ${parsedValue}`
        slideDuration.value = ''
      }, 500)
    })

    animBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const { value } = animDuration
      const parsedValue = parseInt(value)
      if (!value && !Number.isInteger(parsedValue) && parsedValue > 0)
        return alert('This number is not allowed!')
      setAnimDuration(parsedValue)

      //Add class
      animBtn.classList.add('accept-btn')
      setTimeout(() => {
        animBtn.classList.remove('accept-btn')
        animDuration.placeholder = `Current ${parsedValue}`
        // console.log(animDuration)
        animDuration.value = ''
      }, 500)
    })
  }

  return { init }
}
