import React, { useState } from 'react'
import styles from './CartComponentItem.module.css'
import { ICartComponentItem } from './CartComponentItem.types'
import { useAppSelector } from '../../hooks/redux'
import { selectCartItemById } from '../../http/cartApi/cartApiSelectors'
import CartItemSizes from '../CartItemSizes/CartItemSizes'
import CartItemQuantity from '../CartItemQuantity/CartItemQuantity'
import FullSizeImage from '../FullSizeImage/FullSizeImage'
import { useConvert } from '../../hooks/currency'
import { ReactComponent as ArrowRightIcon } from './ArrowRight.svg'

const CartComponentItem = ({ cartItemId, className, ...props }: ICartComponentItem) => {
  const {
    id,
    Product: {
      Brand: { name: brandName },
      Category: { name: categoryName },
      price,
      images
    }
    // we can assure that item will defined because we pass ids from server
    // eslint-disable-next-line
  } = useAppSelector(state => selectCartItemById(state, cartItemId))!

  const [imageIndex, setImageIndex] = useState(0)

  const [convert, { symbol }] = useConvert()
  const convertedPrice = convert(price)

  const parsedImages: string[] = JSON.parse(images)

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
    <div className={className} {...props}>
      <div className={styles.product}>
        <div className={styles.productDescription}>

          <div className={styles.descriptionContainer}>
            <h2 className={styles.brandName}>{brandName}</h2>
            <p className={styles.categoryName}>{categoryName}</p>
            <p className={styles.price}>{symbol}{convertedPrice}{'.00'}</p>
          </div>

          <p className={styles.productDescriptionName}>{'Size:'}</p>
          <CartItemSizes
            cartItemId={id}
            sizesSize={'large'}
          />
        </div >
        <CartItemQuantity cartItemId={id} />
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
      </div>

      <hr className={styles.hr} />
    </div>
  )
}

export default CartComponentItem
