import { RootState } from './../../store/store'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { selectUser } from './../userApi/userApiSelectors'
import { createSelector } from '@reduxjs/toolkit'
import { cartApiSlice, cartItemsAdapter, cartItemsAdapterInitialState } from './cartApi'

const getCartItemsResult = (state: RootState) => {
  const user = selectUser(state)
  return cartApiSlice.endpoints.getCartItems.select(user?.CartId ?? skipToken)(state)
}

const selectCartItemsData = createSelector(
  getCartItemsResult,
  (result) => result.data
)

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemsIds
} = cartItemsAdapter.getSelectors<RootState>(
  state => selectCartItemsData(state) ?? cartItemsAdapterInitialState
)

export const selectCartItemProductById = createSelector(
  selectCartItemById,
  (item) => item?.Product
)

export const selectCartItemProductSizesById = createSelector(
  selectCartItemProductById,
  (product) => product?.sizes
)

export const selectCartItemProductImagesById = createSelector(
  selectCartItemProductById,
  (product) => product?.images
)

export const selectCartItemSizeById = createSelector(
  selectCartItemById,
  (item) => item?.size
)

export const selectCartItemQuantityById = createSelector(
  selectCartItemById,
  (item) => item?.quantity
)

export const selectCartOverallQuantity = createSelector(
  selectAllCartItems,
  (items) => items.reduce(
    (total, item) => total + item.quantity,
    0
  )
)

export const selectIsOverallCartQuantityNotZero = createSelector(
  selectCartOverallQuantity,
  (quantity) => quantity !== 0
)

export const selectCartSubTotal = createSelector(
  selectAllCartItems,
  (items) => items.reduce(
    (total, item) => total + item.Product.price * item.quantity,
    0
  )
)

export const selectCartTaxPercentage = () => 23

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

// export const selectCartItemsStatus = createSelector(
//   selectCartItemsResult,
//   (cartItemsResult) => ({
//     isSuccess: cartItemsResult.isSuccess,
//     isLoading: cartItemsResult.isLoading,
//     isError: cartItemsResult.isError,
//     error: cartItemsResult.error
//   })
// )
