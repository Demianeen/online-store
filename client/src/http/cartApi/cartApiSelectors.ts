import { RootState, store } from './../../store/store'
import { createSelector } from '@reduxjs/toolkit'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { cartApiSlice, cartItemsAdapter, cartItemsInitialState } from './cartApi'
import { userApiSlice } from '../userApi/userApi'

// const authToken = localStorage.getItem('token')
// const UserId = authToken !== null ? jwtDecode<IUserJWT>(authToken).id : undefined

const data = await store.dispatch(userApiSlice.endpoints.check.initiate(undefined))
  .unwrap().catch(() => undefined)

// const data: IUserApiState | undefined = userApiSlice.endpoints.check
//   .select(undefined)(store.getState() as any) as any

export const selectCartItemsResult = cartApiSlice.endpoints.getCartItems
  .select(data?.user?.id ?? skipToken)

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
  (total, taxPercentage) => total * taxPercentage / 100
)

export const selectCartTotal = createSelector(
  selectCartSubTotal,
  selectCartTax,
  (subTotal, tax) => subTotal + tax
)
