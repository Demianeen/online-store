import React from 'react'
import { parsedSize } from '../../store/reducers/types'
import { ICartItemSizes } from './CartItemSizes.types'
import { useChangeItemSizeMutation, useGetCartItemsQuery } from '../../http/cartApi/cartApi'
import SizesSelect from '../SizesSelect/SizesSelect'
import { selectCartItemSizeById, selectProductSizesById } from '../../http/cartApi/cartApiSelectors'
import { useCheckQuery } from '../../http/userApi/userApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const CartItemSizes = ({ sizesSize, cartItemId, className, ...props }: ICartItemSizes) => {
  // we can assure that item will defined because we pass ids from server
  const { data: userData } = useCheckQuery(undefined)
  const {
    selectedSize = 'XL',
    rawProductSizes
  } = useGetCartItemsQuery(userData?.user.id ?? skipToken,
    {
      selectFromResult: ({ data }) => ({
        selectedSize: (data != null) ? selectCartItemSizeById(data, cartItemId) : 'XL',
        rawProductSizes: (data != null) ? selectProductSizesById(data, cartItemId) : 'XL'
      })
    }
  )
  const sizes: parsedSize[] = JSON.parse(rawProductSizes ?? '')

  const [changeItemSize] = useChangeItemSizeMutation()

  const selectSize = async (newSize: parsedSize) => {
    changeItemSize({
      cartItemId:
        typeof cartItemId === 'string'
          ? parseInt(cartItemId)
          : cartItemId,
      size: newSize
    })
  }

  return (
    <SizesSelect
      sizesSize={sizesSize}
      sizes={sizes}
      onSizeSelect={selectSize}
      defaultSize={selectedSize}
    />
  )
}

export default CartItemSizes
