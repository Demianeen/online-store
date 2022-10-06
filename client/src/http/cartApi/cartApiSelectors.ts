import { createSelector } from '@reduxjs/toolkit'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import jwtDecode from 'jwt-decode'
import { IUserJWT } from '../../store/reducers/UserSlice/types'
import { RootState } from '../../store/store'
import { cartApiSlice, cartItemsAdapter, cartItemsInitialState } from './cartApi'

const authToken = localStorage.getItem('token')
const CartId = authToken !== null ? jwtDecode<IUserJWT>(authToken).CartId : undefined
export const selectCartItemsResult = cartApiSlice.endpoints.getCartItems.select(CartId ?? skipToken)

const selectCartItemsData = createSelector(
  selectCartItemsResult,
  (cartItemsResult) => cartItemsResult.data
)

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemIds
} = cartItemsAdapter.getSelectors(
  (state: RootState) => selectCartItemsData(state) ?? cartItemsInitialState
)

export const selectProductSizesById = createSelector(
  selectCartItemById,
  (item) => item?.Product.sizes
)

export const selectCartItemSizeById = createSelector(
  selectCartItemById,
  (item) => item?.size
)

export const selectCartItemsStatus = createSelector(
  selectCartItemsResult,
  (cartItemsResult) => ({
    isSuccess: cartItemsResult.isSuccess,
    isLoading: cartItemsResult.isLoading,
    isError: cartItemsResult.isError,
    error: cartItemsResult.error
  })
)

export const selectCartOverallQuantity = createSelector(
  selectAllCartItems,
  (Items) => Items.reduce(
    (total, item) => total + item.quantity,
    0
  )
)

export const selectCartSubTotal = createSelector(
  selectAllCartItems,
  (Items) => Items.reduce(
    (total, item) => total + (item.Product.price * item.quantity),
    0
  )
)

export const selectCartTaxPercentage = createSelector(
  () => 23
)

export const selectCartTax = createSelector(
  selectCartSubTotal,
  selectCartTaxPercentage,
  // some tax
  (total, taxPercentage) => total * taxPercentage / 100
)

export const selectCartTotal = createSelector(
  selectCartSubTotal,
  selectCartTax,
  (subTotal, tax) => subTotal + tax
)
