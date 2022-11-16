import React from 'react'
import styles from './CartControlItem.module.css'
import { ICartControlItem } from './CartControlItem.types'
import { selectCartItemById } from '../../http/cartApi/cartApiSelectors'
import CartItemSizes from '../CartItemSizes/CartItemSizes'
import CartItemQuantity from '../CartItemQuantity/CartItemQuantity'
import FullSizeImage from '../FullSizeImage/FullSizeImage'
import { useConvert } from '../../hooks/currency'
import { useGetCartItemsQuery } from '../../http/cartApi/cartApi'
import { useCheckQuery } from '../../http/userApi/userApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const CartControlItem = ({ cartItemId, className, ...props }: ICartControlItem) => {
  const { data: userData } = useCheckQuery(undefined)
  const { item } = useGetCartItemsQuery(userData?.user.id ?? skipToken, {
    selectFromResult: ({ data }) => ({
      item: (data !== undefined) ? selectCartItemById(data, cartItemId) : undefined
    })
  })

  const [convert, { symbol }] = useConvert()
  const convertedPrice = convert(item?.Product.price ?? 0)

  const parsedImage = JSON.parse(item?.Product?.images ?? '')[0]

  if (item === undefined) {
    return <></>
  }

  return (
    <div key={item.id} className={styles.product}>
      <div className={styles.productDescription}>

        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionHeadingContainer}>
            <p className={styles.descriptionHeading}>{item.Product.Brand.name}</p>
            <p className={styles.descriptionHeading}>{item.Product.Category.name}</p>
          </div>
          <p className={styles.price}>{symbol}{convertedPrice}{'.00'}</p>
        </div>

        <p className={styles.productDescriptionName}>{'Size:'}</p>
        <CartItemSizes
          cartItemId={item.id}
          sizesSize={'small'}
        />
      </div >
      <CartItemQuantity cartItemId={item.id} />
      <FullSizeImage src={parsedImage} />
    </div>
  )
}

export default CartControlItem
