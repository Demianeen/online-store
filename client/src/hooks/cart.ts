import { useAppSelector } from './redux'
import { useGetCartQuery } from '../http/cartApi/cartApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'

export const useCartTotal = () => {
  const { user } = useAppSelector(store => store.user)
  // TODO: Add better typing
  const { data, isSuccess } = useGetCartQuery(user?.id ?? skipToken)

  if (user === undefined || !isSuccess) {
    return {
      overallQuantity: 0,
      subTotal: 0,
      tax: 0,
      taxPercentage: 0
    }
  }

  const overallQuantity = data.Items.reduce(
    (sum, el) => sum + el.quantity,
    0
  )
  const subTotal = data.Items.reduce(
    (sum, el) => sum + el.Product.price * el.quantity,
    0
  )
  const taxPercentage: number = 23
  const tax = subTotal * taxPercentage / 100

  return {
    overallQuantity,
    subTotal,
    tax,
    taxPercentage
  }
}
