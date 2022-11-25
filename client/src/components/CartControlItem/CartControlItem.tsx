import React from 'react'
import styles from './CartControlItem.module.css'
import { ICartControlItem } from './CartControlItem.types'
import { selectCartItemProductById } from '../../http/cartApi/cartApiSelectors'
import CartItemSizes from '../CartItemSizes/CartItemSizes'
import CartItemQuantity from '../CartItemQuantity/CartItemQuantity'
import FullSizeImage from '../FullSizeImage/FullSizeImage'
import { useAppSelector } from '../../hooks/redux'
import { selectBrandById } from '../../http/brandApi/brandApiSelectors'
import { selectCategoryById } from '../../http/categoryApi/categoryApiSelectors'
import Price from '../Price/Price'

const CartControlItem = ({ cartItemId, className, ...props }: ICartControlItem) => {
  const product = useAppSelector(state => selectCartItemProductById(state, cartItemId))

  const brand = useAppSelector(state => selectBrandById(state, product?.BrandId ?? ''))
  const category = useAppSelector(state => selectCategoryById(state, product?.CategoryId ?? ''))

  if (product === undefined) {
    return <></>
  }

  const parsedImage: string = JSON.parse(product.images)[0]

  return (
    <div key={cartItemId} className={styles.product}>
      <div className={styles.productDescription}>

        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionHeadingContainer}>
            <p className={styles.descriptionHeading}>{brand?.name}</p>
            <p className={styles.descriptionHeading}>{category?.name}</p>
          </div>
          <p className={styles.price}><Price price={product.price} /></p>
        </div>

        <p className={styles.productDescriptionName}>{'Size:'}</p>
        <CartItemSizes
          cartItemId={cartItemId}
          sizesSize={'small'}
        />
      </div >
      <CartItemQuantity cartItemId={cartItemId} />
      <FullSizeImage src={parsedImage} />
    </div>
  )
}

export default CartControlItem
