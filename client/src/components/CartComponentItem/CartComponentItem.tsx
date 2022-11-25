import React from 'react'
import styles from './CartComponentItem.module.css'
import { ICartComponentItem } from './CartComponentItem.types'
import { selectCartItemProductById } from '../../http/cartApi/cartApiSelectors'
import CartItemSizes from '../CartItemSizes/CartItemSizes'
import CartItemQuantity from '../CartItemQuantity/CartItemQuantity'
import { useAppSelector } from '../../hooks/redux'
import { selectBrandById } from '../../http/brandApi/brandApiSelectors'
import Price from '../Price/Price'
import CartComponentItemSlider from '../CartComponentItemSlider/CartComponentItemSlider'

const CartComponentItem = ({ cartItemId, className, ...props }: ICartComponentItem) => {
  const product = useAppSelector(state => selectCartItemProductById(state, cartItemId))

  const brand = useAppSelector(state => selectBrandById(state, product?.BrandId ?? ''))
  const category = useAppSelector(state => selectBrandById(state, product?.CategoryId ?? ''))

  if (product === undefined) {
    return <></>
  }

  return (
    <div className={className} {...props}>
      <div className={styles.product}>
        <div className={styles.productDescription}>

          <div className={styles.descriptionContainer}>
            <h2 className={styles.brandName}>{brand?.name}</h2>
            <p className={styles.categoryName}>{category?.name}</p>
            <p className={styles.price}><Price price={product.price} /></p>
          </div>

          <p className={styles.productDescriptionName}>{'Size:'}</p>
          <CartItemSizes
            cartItemId={cartItemId}
            sizesSize={'large'}
          />
        </div >
        <CartItemQuantity cartItemId={cartItemId} className={styles.quantity} />
        <CartComponentItemSlider cartItemId={cartItemId} />
      </div>
      <hr className={styles.hr} />
    </div>
  )
}

export default CartComponentItem
