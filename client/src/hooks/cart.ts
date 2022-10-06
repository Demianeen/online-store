import { selectAllCartItems } from '../http/cartApi/cartApiSelectors'
import { useAppSelector } from './redux'

// it is not used now because of the selector's usage.
// It is here to show custom hook usage example
export const useCartTotal = () => {
  // const { data, isSuccess } = useGetCartQuery(user?.id ?? skipToken)
  const Items = useAppSelector(selectAllCartItems)

  const overallQuantity = Items.reduce(
    (sum, el) => sum + el.quantity,
    0
  )
  const subTotal = Items.reduce(
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
