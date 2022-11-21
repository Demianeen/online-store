import { createSlice } from '@reduxjs/toolkit'
import { IProductState } from './productParamsSlice.types'
import { nextPage, previousPage, selectBrand, selectCategory, selectGender, setLimit } from './productParamsSliceActions'

const initialState: IProductState = {
  limit: 12,
  page: 1,
  selectedGender: 'WOMEN'
}

const productSlice = createSlice({
  name: 'productParams',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(selectCategory, (state, action) => {
        state.page = 1
        state.selectedCategoryId = action.payload
      })
      .addCase(selectBrand, (state, action) => {
        state.page = 1
        state.selectedCategoryId = action.payload
      })
      .addCase(selectGender, (state, action) => {
        state.page = 1
        state.selectedGender = action.payload
      })
      .addCase(setLimit, (state, action) => {
        state.limit = action.payload
      })
      .addCase(nextPage, state => {
        state.page++
      })
      .addCase(previousPage, state => {
        state.page--
      })
  }
})

export default productSlice
