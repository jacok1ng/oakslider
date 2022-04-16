import { ImageAsset, MoveDirection } from './types'

interface AnimateSlideInterface {
  assets: ImageAsset[]
}

export const useAnimateSlide = ({ assets }: AnimateSlideInterface) => {
  let isAnimating = false
  let indexOfPhoto = 0
  let timer: number | null = null
  let slideTime = 3.5
  let animTime = 1.5
  const currentPhoto: HTMLImageElement = document.querySelector('.photo')
  const nextPhoto: HTMLImageElement = document.querySelector('.next-photo')
  const previousPhoto: HTMLImageElement =
    document.querySelector('.previous-photo')
  const pagination = document.querySelector('.pagination')
  const right = document.querySelector('.right')
  const left = document.querySelector('.left')

  const init = () => {
    previousPhoto.src = assets[assets.length - 1].src
    currentPhoto.src = assets[0].src
    nextPhoto.src = assets[1].src

    right.addEventListener('click', () => {
      restartTimer()
      moveSlide(MoveDirection.Right)
    })

    left.addEventListener('click', () => {
      restartTimer()
      moveSlide(MoveDirection.Left)
    })

    //Insert pagination
    updateMenu()

    //Interval
    clearInterval(timer)
    timer = setInterval(() => {
      moveSlide(MoveDirection.Right)
    }, slideTime * 1000)
  }
  const moveSlide = (
    direction: MoveDirection,
    customAnim?: (anim: Animation) => void
  ) => {
    if (isAnimating) return

    isAnimating = true
    if (direction === MoveDirection.Right) {
      const anim = currentPhoto.animate(
        { transform: 'translateX(-100%)' },
        { duration: animTime * 1000, easing: 'ease' }
      )
      nextPhoto.animate(
        { transform: 'translateX(0%)' },
        { duration: animTime * 1000, easing: 'ease' }
      )

      if (customAnim) return customAnim(anim)

      anim.onfinish = () => {
        ++indexOfPhoto
        if (indexOfPhoto > assets.length - 1) indexOfPhoto = 0
        const decrementedIndex =
          indexOfPhoto - 1 < 0 ? assets.length - 1 : indexOfPhoto - 1
        assets[indexOfPhoto].inUse = true
        assets[decrementedIndex].inUse = false

        //Change photos
        updatePhotos(indexOfPhoto)
        updateMenu()

        isAnimating = false
      }
    }
    if (direction === MoveDirection.Left) {
      const anim = currentPhoto.animate(
        { transform: 'translateX(100%)' },
        { duration: animTime * 1000, easing: 'ease' }
      )
      previousPhoto.animate(
        { transform: 'translateX(0%)' },
        { duration: animTime * 1000, easing: 'ease' }
      )

      if (customAnim) return customAnim(anim)

      anim.onfinish = () => {
        --indexOfPhoto
        if (indexOfPhoto < 0) indexOfPhoto = assets.length - 1
        const incrementedIndex =
          indexOfPhoto + 1 > assets.length - 1 ? 0 : indexOfPhoto + 1
        assets[incrementedIndex].inUse = false
        assets[indexOfPhoto].inUse = true

        //Change photos
        updatePhotos(indexOfPhoto)
        updateMenu()

        isAnimating = false
      }
    }
  }
  const updateMenu = () => {
    pagination.innerHTML = `${assets
      .map(({ inUse }, index) =>
        inUse
          ? `<i class="fa-solid fa-circle clickable dot dot-${index}"></i>`
          : `<i class="fa-solid fa-circle-notch clickable dot dot-${index}"></i>`
      )
      .join('')}`

    document.querySelectorAll('.dot').forEach((item, index) =>
      item.addEventListener('click', () => {
        if (index > indexOfPhoto) {
          // to right
          moveSlide(MoveDirection.Right, (anim) => {
            restartTimer()
            nextPhoto.src = assets[index].src

            anim.onfinish = () => {
              assets[indexOfPhoto].inUse = false
              assets[index].inUse = true

              indexOfPhoto = index

              //Change photos
              updatePhotos(index)
              updateMenu()

              isAnimating = false
            }
          })
        }
        if (index < indexOfPhoto) {
          //to left
          moveSlide(MoveDirection.Left, (anim) => {
            restartTimer()
            previousPhoto.src = assets[index].src

            anim.onfinish = () => {
              assets[indexOfPhoto].inUse = false
              assets[index].inUse = true

              indexOfPhoto = index

              //Change photos
              updatePhotos(index)
              updateMenu()

              isAnimating = false
            }
          })
        }
      })
    )
  }
  const updatePhotos = (index: number) => {
    const incrementedIndex = index + 1 > assets.length - 1 ? 0 : index + 1
    const decrementedIndex = index - 1 < 0 ? assets.length - 1 : index - 1

    previousPhoto.src = assets[decrementedIndex].src
    currentPhoto.src = assets[index].src
    nextPhoto.src = assets[incrementedIndex].src
  }
  const restartTimer = () => {
    clearInterval(timer)
    timer = setInterval(() => {
      moveSlide(MoveDirection.Right)
    }, slideTime * 1000)
  }
  const setAnimDuration = (time: number) => {
    animTime = time
    restartTimer()
  }
  const setSlideDuration = (time: number) => {
    slideTime = time
    restartTimer()
  }

  return {
    init,
    moveSlide,
    isAnimating,
    restartTimer,
    setAnimDuration,
    setSlideDuration,
  }
}
