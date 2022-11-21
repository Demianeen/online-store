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
import { useAppSelector } from '../../hooks/redux'
import { selectBrandById } from '../../http/brandApi/brandApiSelectors'
import { selectCategoryById } from '../../http/categoryApi/categoryApiSelectors'

const CartControlItem = ({ cartItemId, className, ...props }: ICartControlItem) => {
  const { data: userData } = useCheckQuery(undefined)
  const { item } = useGetCartItemsQuery(userData?.user.CartId ?? skipToken, {
    selectFromResult: ({ data }) => ({
      item: (data !== undefined) ? selectCartItemById(data, cartItemId) : undefined
    })
  })

  const brand = useAppSelector(state => selectBrandById(state, item?.Product?.BrandId ?? ''))
  const category = useAppSelector(state => selectCategoryById(state, item?.Product?.CategoryId ?? ''))

  const [convert, { symbol }] = useConvert()

  if (item === undefined) {
    return <></>
  }

  const convertedPrice = convert(item.Product.price ?? 0)

  const parsedImage: string = JSON.parse(item.Product.images)[0]

  return (
    <div key={item.id} className={styles.product}>
      <div className={styles.productDescription}>

        <div className={styles.descriptionContainer}>
          <div className={styles.descriptionHeadingContainer}>
            <p className={styles.descriptionHeading}>{brand?.name}</p>
            <p className={styles.descriptionHeading}>{category?.name}</p>
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
