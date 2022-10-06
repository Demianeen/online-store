import React from 'react'
import { parsedSize } from '../../store/reducers/types'
import { ICartItemSizes } from './CartItemSizes.types'
import { useAppSelector } from '../../hooks/redux'
import { useChangeItemSizeMutation } from '../../http/cartApi/cartApi'
import SizesSelect from '../SizesSelect/SizesSelect'
import { selectCartItemSizeById, selectProductSizesById } from '../../http/cartApi/cartApiSelectors'

const CartItemSizes = ({ sizesSize, cartItemId, className, ...props }: ICartItemSizes) => {
  // we can assure that item will defined because we pass ids from server
  // eslint-disable-next-line
  const size = useAppSelector(state => selectCartItemSizeById(state, cartItemId))!
  // eslint-disable-next-line
  const rawSizes = useAppSelector(state => selectProductSizesById(state, cartItemId))!
  const sizes: parsedSize[] = JSON.parse(rawSizes)

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
      defaultSize={size}
    />
  )
}

export default CartItemSizes
