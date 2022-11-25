import React from 'react'
import { selectCartOverallQuantity } from '../../http/cartApi/cartApiSelectors'
import { useAppSelector } from '../../hooks/redux'

const OverallCartQuantity = () => {
  const quantity = useAppSelector(selectCartOverallQuantity)

  return (
    <>{quantity}</>
  )
}

export default OverallCartQuantity
