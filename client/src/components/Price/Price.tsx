import React from 'react'
import { useConvert } from '../../hooks/currency'
import { IPrice } from './Price.types'

const Price = ({ price }: IPrice) => {
  const [convert, { symbol }] = useConvert()
  const convertedPrice = convert(price)

  return (
    <>{symbol}{convertedPrice}{'.00'}</>
  )
}

export default Price
