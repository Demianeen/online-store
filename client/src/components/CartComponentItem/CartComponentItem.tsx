import React, { useState } from 'react'
import styles from './CartComponentItem.module.css'
import { ICartComponentItem } from './CartComponentItem.types'
import { selectCartItemById } from '../../http/cartApi/cartApiSelectors'
import CartItemSizes from '../CartItemSizes/CartItemSizes'
import CartItemQuantity from '../CartItemQuantity/CartItemQuantity'
import FullSizeImage from '../FullSizeImage/FullSizeImage'
import { useConvert } from '../../hooks/currency'
import { ReactComponent as ArrowRightIcon } from './ArrowRight.svg'
import { useGetCartItemsQuery } from '../../http/cartApi/cartApi'
import { useCheckQuery } from '../../http/userApi/userApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useAppSelector } from '../../hooks/redux'
import { selectBrandById } from '../../http/brandApi/brandApiSelectors'

const CartComponentItem = ({ cartItemId, className, ...props }: ICartComponentItem) => {
  const { data: userData } = useCheckQuery(undefined)
  const { item } = useGetCartItemsQuery(userData?.user.CartId ?? skipToken, {
    selectFromResult: ({ data }) => ({
      item: (data !== undefined) ? selectCartItemById(data, cartItemId) : undefined
    })
  })

  const brand = useAppSelector(state => selectBrandById(state, item?.Product?.BrandId ?? ''))
  const category = useAppSelector(state => selectBrandById(state, item?.Product?.CategoryId ?? ''))

  const [imageIndex, setImageIndex] = useState(0)

  const [convert, { symbol }] = useConvert()

  if (item === undefined) {
    return <></>
  }

  const convertedPrice = convert(item.Product.price)
  const parsedImages: string[] = JSON.parse(item.Product.images)

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
            <h2 className={styles.brandName}>{brand?.name}</h2>
            <p className={styles.categoryName}>{category?.name}</p>
            <p className={styles.price}>{symbol}{convertedPrice}{'.00'}</p>
          </div>

          <p className={styles.productDescriptionName}>{'Size:'}</p>
          <CartItemSizes
            cartItemId={item.id ?? 0}
            sizesSize={'large'}
          />
        </div >
        <CartItemQuantity cartItemId={item.id} className={styles.quantity} />
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
