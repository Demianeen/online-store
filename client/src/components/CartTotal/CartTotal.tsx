import React from 'react'
import { selectCartTotal } from '../../http/cartApi/cartApiSelectors'
import { useAppSelector } from '../../hooks/redux'
import Price from '../Price/Price'

const CartTotal = () => {
  const total = useAppSelector(selectCartTotal)

  return (
    <Price price={total} />
  )
}

export default CartTotal
