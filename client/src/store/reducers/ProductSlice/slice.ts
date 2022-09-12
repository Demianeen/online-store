import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBrand, ICategory, IProduct, IProductState } from './types'

const initialState: IProductState = {
  categories: [],
  brands: [],
  products: [],
  amountOfProducts: 0,
  limit: 2,
  page: 1,
  selectedCategoryId: undefined,
  selectedBrandId: undefined
}

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setTypes (
      state: IProductState,
      action: PayloadAction<ICategory[]>
    ) {
      state.categories = action.payload
    },
    setBrands (
      state: IProductState,
      action: PayloadAction<IBrand[]>
    ) {
      state.brands = action.payload
    },
    setDevices (
      state: IProductState,
      action: PayloadAction<IProduct[]>
    ) {
      state.products = action.payload
    },
    selectCategory (
      state: IProductState,
      action: PayloadAction<number | undefined>
    ) {
      state.page = 1
      state.selectedCategoryId = action.payload
    },
    selectBrand (
      state: IProductState,
      action: PayloadAction<number | undefined>
    ) {
      state.page = 1
      state.selectedBrandId = action.payload
    },
    setAmountOfDevices (
      state: IProductState,
      action: PayloadAction<number>
    ) {
      state.amountOfProducts = action.payload
    },
    setLimit (
      state: IProductState,
      action: PayloadAction<number>
    ) {
      state.limit = action.payload
    },
    setPage (
      state: IProductState,
      action: PayloadAction<number>
    ) {
      state.page = action.payload
    }
  }
})

export default productSlice
