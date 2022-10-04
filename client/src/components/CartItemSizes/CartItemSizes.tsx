import React from 'react'
import { parsedSize } from '../../store/reducers/types'
import { ICartItemSizes } from './CartItemSizes.types'
import { useAppSelector } from '../../hooks/redux'
import SizesSelect from '../SizesSelect/SizesSelect'
import { useChangeItemSizeMutation } from '../../http/cartApi/cartApi'

const CartItemSizes = ({ sizesSize, cartItem, className, ...props }: ICartItemSizes) => {
  const { user } = useAppSelector(store => store.user)
  const { id, Product, size } = cartItem

  const [changeItemSize] = useChangeItemSizeMutation()

  const sizes: parsedSize[] = JSON.parse(Product.sizes)

  const selectSize = async (newSize: parsedSize) => {
    if (user === undefined) return alert('You must login first')

    changeItemSize({ cartItemId: id, size: newSize })
    // await changeItemSize(id, newSize)
    // dispatch(fetchCart(user.id))
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
