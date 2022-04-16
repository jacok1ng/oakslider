export const useAnimateSlide = (assets, restartTimer) => {
  let isAnimating = false
  let indexOfPhoto = 0
  const currentPhoto = document.querySelector('.photo')
  const nextPhoto = document.querySelector('.next-photo')
  const previousPhoto = document.querySelector('.previous-photo')
  const pagination = document.querySelector('.pagination')

  const moveSlide = (direction, customAnim) => {
    if (isAnimating) return

    isAnimating = true
    if (direction === 'right') {
      const anim = currentPhoto.animate(
        { transform: 'translateX(-100%)' },
        { duration: 1500, easing: 'ease' }
      )
      nextPhoto.animate(
        { transform: 'translateX(0%)' },
        { duration: 1500, easing: 'ease' }
      )

      if (customAnim) return customAnim(anim)

      anim.onfinish = () => {
        ++indexOfPhoto
        if (indexOfPhoto > assets.length - 1) indexOfPhoto = 0
        const incrementedIndex =
          indexOfPhoto + 1 > assets.length - 1 ? 0 : indexOfPhoto + 1
        const decrementedIndex =
          indexOfPhoto - 1 < 0 ? assets.length - 1 : indexOfPhoto - 1
        assets[indexOfPhoto].inUse = true
        assets[decrementedIndex].inUse = false

        //Change photos
        previousPhoto.src = assets[decrementedIndex].src
        currentPhoto.src = assets[indexOfPhoto].src
        nextPhoto.src = assets[incrementedIndex].src

        updateMenu()

        isAnimating = false
      }
    }
    if (direction === 'left') {
      const anim = currentPhoto.animate(
        { transform: 'translateX(100%)' },
        { duration: 1500, easing: 'ease' }
      )
      previousPhoto.animate(
        { transform: 'translateX(0%)' },
        { duration: 1500, easing: 'ease' }
      )

      if (customAnim) return customAnim(anim)

      anim.onfinish = () => {
        --indexOfPhoto
        if (indexOfPhoto < 0) indexOfPhoto = assets.length - 1
        const incrementedIndex =
          indexOfPhoto + 1 > assets.length - 1 ? 0 : indexOfPhoto + 1
        const decrementedIndex =
          indexOfPhoto - 1 < 0 ? assets.length - 1 : indexOfPhoto - 1
        assets[incrementedIndex].inUse = false
        assets[indexOfPhoto].inUse = true

        //Change photos
        previousPhoto.src = assets[decrementedIndex].src
        currentPhoto.src = assets[indexOfPhoto].src
        nextPhoto.src = assets[incrementedIndex].src

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
          moveSlide('right', anim => {
            restartTimer()
            nextPhoto.src = assets[index].src

            anim.onfinish = () => {
              const incrementedIndex =
                index + 1 > assets.length - 1 ? 0 : index + 1
              const decrementedIndex =
                index - 1 < 0 ? assets.length - 1 : index - 1
              assets[indexOfPhoto].inUse = false
              assets[index].inUse = true

              indexOfPhoto = index

              //Change photos
              previousPhoto.src = assets[decrementedIndex].src
              currentPhoto.src = assets[indexOfPhoto].src
              nextPhoto.src = assets[incrementedIndex].src

              updateMenu()

              isAnimating = false
            }
          })
        }
        if (index < indexOfPhoto) {
          //to left
          moveSlide('left', anim => {
            restartTimer()
            previousPhoto.src = assets[index].src

            anim.onfinish = () => {
              const incrementedIndex =
                index + 1 > assets.length - 1 ? 0 : index + 1
              const decrementedIndex =
                index - 1 < 0 ? assets.length - 1 : index - 1
              assets[indexOfPhoto].inUse = false
              assets[index].inUse = true

              indexOfPhoto = index

              //Change photos
              previousPhoto.src = assets[decrementedIndex].src
              currentPhoto.src = assets[indexOfPhoto].src
              nextPhoto.src = assets[incrementedIndex].src

              updateMenu()

              isAnimating = false
            }
          })
        }
      })
    )
  }

  return { moveSlide, isAnimating, updateMenu }
}
