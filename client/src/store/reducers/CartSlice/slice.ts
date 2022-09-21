import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { getCart } from '../../../http/cartApi'
import { ICartItem, IProductState } from './types'

const initialState: IProductState = {
  Items: [],
  overallQuantity: 0,
  itemsPrice: 0,
  taxPercentage: 21,
  tax: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setItems (
      state: IProductState,
      action: PayloadAction<ICartItem[]>
    ) {
      state.Items = action.payload

      state.Items.forEach(item => {
        state.itemsPrice += item.quantity * item.Product.price
        state.overallQuantity += item.quantity
      })
      state.tax = state.itemsPrice * state.taxPercentage / 100
    },
    setItemQuantity (
      state: IProductState,
      action: PayloadAction<{ id: number, quantity: number }>
    ) {
      state.Items = state.Items.map(item => {
        if (item.id === action.payload.id) {
          state.itemsPrice -= item.quantity * item.Product.price
          state.overallQuantity -= item.quantity

          item.quantity = action.payload.quantity

          state.itemsPrice += item.quantity * item.Product.price
          state.overallQuantity += item.quantity

          state.tax = state.itemsPrice * state.taxPercentage / 100
        }
        return item
      })
    },
    increaseTaxPercentage (
      state: IProductState,
      action: PayloadAction<number>
    ) {
      state.taxPercentage += action.payload
      state.tax = state.itemsPrice * state.taxPercentage / 100
    }
  },
  extraReducers (builder) {
    builder.addCase(fetchCart.fulfilled, (state, action) => {
      state.Items = action.payload.Items

      state.itemsPrice = 0
      state.overallQuantity = 0
      action.payload.Items.forEach(item => {
        state.itemsPrice += item.quantity * item.Product.price
        state.overallQuantity += item.quantity

        state.tax = state.itemsPrice * state.taxPercentage / 100
      })
    })
  }
})

export default cartSlice

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (UserId: number) => {
    const cart = await getCart(UserId)
    return cart
  }
)
