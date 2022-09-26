import { parsedSize } from './../store/reducers/types'
import { ICart, ICartItem, CartItemCreate } from './../store/reducers/CartSlice/types'
import { $authHost } from '.'

export const addItem = async (item: CartItemCreate) => {
  const { data } = await $authHost.post<ICartItem>(process.env.REACT_APP_API_URL + 'api/cart/item', item)

  return data
}

export const changeItemQuantity = async (CartItemId: number, quantity: number) => {
  const { data } = await $authHost.post<number>(process.env.REACT_APP_API_URL + 'api/cart/item/quantity', {
    id: CartItemId,
    quantity
  })

  return data
}

export const changeItemSelectedSize = async (CartItemId: number, size: parsedSize) => {
  const { data } = await $authHost.post<number>(process.env.REACT_APP_API_URL + 'api/cart/item/size', {
    id: CartItemId,
    size
  })

  return data
}

export const clearCart = async (CartId: number) => {
  // amount of rows affected
  const { data } = await $authHost.post<number>(process.env.REACT_APP_API_URL + 'api/cart/item/remove', {
    CartId
  })

  return data
}

export const getCart = async (UserId: number) => {
  const { data } = await $authHost.get<ICart>(process.env.REACT_APP_API_URL + 'api/cart', {
    params: {
      UserId
    }
  })

  return data
}
