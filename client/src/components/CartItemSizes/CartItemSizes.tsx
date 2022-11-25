import React from 'react'
import { parsedSize } from '../../store/reducers/types'
import { ICartItemSizes } from './CartItemSizes.types'
import { useChangeItemSizeMutation } from '../../http/cartApi/cartApi'
import SizesSelect from '../SizesSelect/SizesSelect'
import { selectCartItemSizeById, selectProductSizesById } from '../../http/cartApi/cartApiSelectors'
import { useAppSelector } from '../../hooks/redux'

const CartItemSizes = ({ sizesSize, cartItemId, className, ...props }: ICartItemSizes) => {
  const selectedSize = useAppSelector(state => selectCartItemSizeById(state, cartItemId))
  const sizes = useAppSelector(state => selectProductSizesById(state, cartItemId))

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
      defaultSize={selectedSize ?? 'XL'}
    />
  )
}

export default CartItemSizes
