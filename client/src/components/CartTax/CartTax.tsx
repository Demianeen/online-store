import React from 'react'
import { selectCartTax } from '../../http/cartApi/cartApiSelectors'
import { useAppSelector } from '../../hooks/redux'
import Price from '../Price/Price'

const CartTax = () => {
  const tax = useAppSelector(selectCartTax)

  return (
    <Price price={tax} />
  )
}

export default CartTax
