import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBrand, ICategory, IProductWithBrandAndCategory, IProductState } from './types'

const initialState: IProductState = {
  categories: [],
  brands: [],
  products: [],
  amountOfProducts: 0,
  limit: 6,
  page: 1,
  selectedCategory: undefined,
  selectedGender: undefined
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
    setProducts (
      state: IProductState,
      action: PayloadAction<IProductWithBrandAndCategory[]>
    ) {
      state.products = action.payload
    },
    selectCategory (
      state: IProductState,
      action: PayloadAction<ICategory>
    ) {
      state.page = 1
      state.selectedCategory = action.payload
    },
    selectGender (
      state: IProductState,
      action: PayloadAction<string | undefined>
    ) {
      state.page = 1
      state.selectedGender = action.payload
    },
    setAmountOfProducts (
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
