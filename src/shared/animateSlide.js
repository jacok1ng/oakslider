export const useAnimateSlide = assets => {
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
      console.log('right')
      const anim = currentPhoto.animate(
        { transform: 'translateX(-100%)' },
        { duration: 1500, easing: 'ease' }
      )
      nextPhoto.animate(
        { transform: 'translateX(0%)' },
        { duration: 1500, easing: 'ease' }
      )

      if (customAnim) return customAnim()

      anim.onfinish = () => {
        assets[indexOfPhoto % assets.length].inUse = false
        assets[(indexOfPhoto + 1) % assets.length].inUse = true

        indexOfPhoto++

        //Change photos
        previousPhoto.src = assets[(indexOfPhoto - 1) % assets.length].src
        currentPhoto.src = assets[indexOfPhoto % assets.length].src
        nextPhoto.src = assets[(indexOfPhoto + 1) % assets.length].src

        updateMenu()

        isAnimating = false
      }
    }
    if (direction === 'left') {
      console.log('left')
      const anim = currentPhoto.animate(
        { transform: 'translateX(100%)' },
        { duration: 1500, easing: 'ease' }
      )
      previousPhoto.animate(
        { transform: 'translateX(0%)' },
        { duration: 1500, easing: 'ease' }
      )

      if (customAnim) return customAnim()

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
          moveSlide('right', () => {})
        }
        if (index < indexOfPhoto) {
          //to left
        }
      })
    )
  }

  return { moveSlide, isAnimating, updateMenu }
}
