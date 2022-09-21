import { ICart, ICartItem, ICartItemCreate } from './../store/reducers/CartSlice/types'
import { $authHost } from '.'

export const addItem = async (item: ICartItemCreate) => {
  const { data } = await $authHost.post<ICartItem>(process.env.REACT_APP_API_URL + 'api/cart/item', item)

  return data
}

export const changeItemQuantity = async (id: number, quantity: number) => {
  const { data } = await $authHost.post<number>(process.env.REACT_APP_API_URL + 'api/cart/item/quantity', {
    id,
    quantity
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
