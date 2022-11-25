import React, { useState } from 'react'
import styles from './CartComponentItemSlider.module.css'
import { ICartComponentItem } from './CartComponentItemSlider.types'
import { selectProductImagesById } from '../../http/cartApi/cartApiSelectors'
import FullSizeImage from '../FullSizeImage/FullSizeImage'
import { ReactComponent as ArrowRightIcon } from './ArrowRight.svg'
import { useAppSelector } from '../../hooks/redux'

const CartComponentItemSlider = ({ cartItemId, className, ...props }: ICartComponentItem) => {
  const [imageIndex, setImageIndex] = useState(0)

  const images = useAppSelector(state => selectProductImagesById(state, cartItemId))
  const parsedImages: string[] = JSON.parse(images ?? '')

  const previousImage = () => {
    const decreasedIndex = imageIndex - 1
    if (decreasedIndex >= 0) {
      return setImageIndex(decreasedIndex)
    }
    setImageIndex(parsedImages.length - 1)
  }

  const nextImage = () => {
    const increasedIndex = imageIndex + 1
    if (increasedIndex < parsedImages.length) {
      return setImageIndex(increasedIndex)
    }
    setImageIndex(0)
  }

  return (
    <div className={styles.slider}>
      <FullSizeImage src={parsedImages[imageIndex]} />
      <div className={styles.sliderButtons}>
        <button
          className={styles.previousImage}
          onClick={previousImage}
        >
          <ArrowRightIcon />
        </button>
        <button
          className={styles.nextImage}
          onClick={nextImage}
        >
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  )
}

export default CartComponentItemSlider
