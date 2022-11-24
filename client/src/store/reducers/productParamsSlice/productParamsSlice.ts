import { createSlice } from '@reduxjs/toolkit'
import { IProductState } from './productParamsSlice.types'
import {
  endValues,
  nextPage,
  previousPage,
  selectGender,
  setLimit,
  toggleIsNeedToResetState
} from './productParamsSliceActions'

const initialState: IProductState = {
  params: {
    limit: 12,
    page: 1,
    selectedGender: 'WOMEN'
  },
  isValuesEnded: false,
  isNeedToResetState: false
}

const productParamsSlice = createSlice({
  name: 'productParams',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
    // .addCase(selectCategory, (state, action) => {
    //   state.params.page = 1
    //   state.isValuesEnded = false
    //   state.params.selectedCategoryId = action.payload
    // })
    // .addCase(selectBrand, (state, action) => {
    //   state.params.page = 1
    //   state.isValuesEnded = false
    //   state.params.selectedCategoryId = action.payload
    // })

      .addCase(selectGender, (state, action) => {
        state.params.page = 1
        state.isValuesEnded = false
        state.isNeedToResetState = true

        state.params.selectedGender = action.payload
      })
      .addCase(setLimit, (state, action) => {
        state.params.limit = action.payload
      })
      .addCase(nextPage, state => {
        state.params.page++
      })
      .addCase(previousPage, state => {
        state.params.page--
      })
      .addCase(endValues, (state) => {
        state.isValuesEnded = true
      })
      .addCase(toggleIsNeedToResetState, (state) => {
        state.isNeedToResetState = !state.isNeedToResetState
      })
  }
})

export default productParamsSlice
