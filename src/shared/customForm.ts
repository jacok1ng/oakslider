const slideDuration: HTMLInputElement =
  document.querySelector('#slide-duration')
const animDuration: HTMLInputElement = document.querySelector('#anim-duration')
const customBtn = document.querySelector('.btn-custom')
const revealMenu = document.querySelector('.reveal-menu')
const slideBtn = document.querySelector('.apply-slide')
const animBtn = document.querySelector('.apply-anim')

interface CustomFormProps {
  setAnimDuration: (time: number) => void
  setSlideDuration: (time: number) => void
}

export const useCustomForm = ({
  setAnimDuration,
  setSlideDuration,
}: CustomFormProps) => {
  const init = () => {
    customBtn.addEventListener('click', () => {
      revealMenu.classList.toggle('hide')
    })

    slideBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const { value } = slideDuration
      if (!Number.isInteger(parseInt(value)))
        return alert('This is not a number!')
      setSlideDuration(parseInt(value))

      //Add class
      slideBtn.classList.add('accept-btn')
      setTimeout(() => {
        slideBtn.classList.remove('accept-btn')
        slideDuration.value = ''
      }, 500)
    })

    animBtn.addEventListener('click', (e) => {
      e.preventDefault()
      const { value } = animDuration
      if (!Number.isInteger(parseInt(value)))
        return alert('This is not a number!')
      setAnimDuration(parseInt(value))

      //Add class
      animBtn.classList.add('accept-btn')
      setTimeout(() => {
        animBtn.classList.remove('accept-btn')
        animDuration.value = ''
      }, 500)
    })
  }

  return { init }
}
