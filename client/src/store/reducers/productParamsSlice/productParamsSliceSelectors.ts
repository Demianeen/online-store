import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const selectProductParamsState = (state: RootState) => state.productParams

export const selectProductGender = createSelector(
  selectProductParamsState,
  (params) => params.selectedGender
)

export const selectProductLimit = createSelector(
  selectProductParamsState,
  (params) => params.limit
)

export const selectProductPage = createSelector(
  selectProductParamsState,
  (params) => params.page
)

export const selectSelectedBrandId = createSelector(
  selectProductParamsState,
  (params) => params.selectedBrandId
)

export const selectSelectedCategoryId = createSelector(
  selectProductParamsState,
  (params) => params.selectedCategoryId
)
