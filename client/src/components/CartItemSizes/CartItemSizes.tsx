import React from 'react'
import { parsedSize } from '../../store/reducers/types'
import { ICartItemSizes } from './CartItemSizes.types'
import { changeItemSelectedSize } from '../../http/cartApi'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchCart } from '../../store/reducers/CartSlice/slice'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'
import SizesSelect from '../SizesSelect/SizesSelect'

const CartItemSizes = ({ sizesSize, cartItem, className, ...props }: ICartItemSizes) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(store => store.user)
  const { id, Product, size } = cartItem

  const navigate = useNavigate()

  const sizes: parsedSize[] = JSON.parse(Product.sizes)

  const selectSize = async (newSize: parsedSize) => {
    if (user === undefined) return navigate(Routes.LOGIN_ROUTE)
    await changeItemSelectedSize(id, newSize)
    dispatch(fetchCart(user.id))
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
