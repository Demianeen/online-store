import { createSelector } from '@reduxjs/toolkit'
import { cartItemsAdapter } from './cartApi'

export const {
  selectAll: selectAllCartItems,
  selectById: selectCartItemById,
  selectIds: selectCartItemsIds
} = cartItemsAdapter.getSelectors()

export const selectProductSizesById = createSelector(
  selectCartItemById,
  (item) => item?.Product?.sizes
)

export const selectCartItemSizeById = createSelector(
  selectCartItemById,
  (item) => item?.size
)

export const selectCartOverallQuantity = createSelector(
  selectAllCartItems,
  (items) => items.reduce(
    (total, item) => total + item.quantity,
    0
  )
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
