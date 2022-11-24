import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const selectProductParamsState = (state: RootState) => state.productParams

export const selectProductParams = createSelector(
  selectProductParamsState,
  (state) => state.params
)

export const selectProductGender = createSelector(
  selectProductParams,
  (params) => params.selectedGender
)

export const selectProductLimit = createSelector(
  selectProductParams,
  (params) => params.limit
)

export const selectProductPage = createSelector(
  selectProductParams,
  (params) => params.page
)

// export const selectSelectedBrandId = createSelector(
//   selectProductParams,
//   (params) => params.selectedBrandId
// )

// export const selectSelectedCategoryId = createSelector(
//   selectProductParams,
//   (params) => params.selectedCategoryId
// )

export const selectIsValuesEnded = createSelector(
  selectProductParamsState,
  (state) => state.isValuesEnded
)

export const selectIsNeedToResetProductState = createSelector(
  selectProductParamsState,
  (state) => state.isNeedToResetState
)
