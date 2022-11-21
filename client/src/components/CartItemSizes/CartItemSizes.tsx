import React from 'react'
import { parsedSize } from '../../store/reducers/types'
import { ICartItemSizes } from './CartItemSizes.types'
import { useChangeItemSizeMutation, useGetCartItemsQuery } from '../../http/cartApi/cartApi'
import SizesSelect from '../SizesSelect/SizesSelect'
import { selectCartItemSizeById, selectProductSizesById } from '../../http/cartApi/cartApiSelectors'
import { useCheckQuery } from '../../http/userApi/userApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const CartItemSizes = ({ sizesSize, cartItemId, className, ...props }: ICartItemSizes) => {
  const { data: userData } = useCheckQuery(undefined)
  const {
    selectedSize = 'XL',
    sizes
  } = useGetCartItemsQuery(userData?.user.CartId ?? skipToken,
    {
      selectFromResult: ({ data }) => ({
        selectedSize: (data !== undefined) ? selectCartItemSizeById(data, cartItemId) : 'XL',
        sizes: (data !== undefined) ? selectProductSizesById(data, cartItemId) : '["XL"]'
      })
    }
  )

  const parsedSizes: parsedSize[] = JSON.parse(sizes ?? '["XL"]')

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
      sizes={parsedSizes}
      onSizeSelect={selectSize}
      defaultSize={selectedSize}
    />
  )
}

export default CartItemSizes
