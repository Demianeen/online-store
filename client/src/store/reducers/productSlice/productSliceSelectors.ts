import { RootState } from '../../store'
import { productAdapter } from './productSlice'

export const selectProductState = (state: RootState) => state.product

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductsIds,
  selectTotal: selectProductsQuantity,
  selectEntities: selectProductEntities
} = productAdapter.getSelectors(selectProductState)
