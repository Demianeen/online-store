import { createSelector } from '@reduxjs/toolkit'
import { categoriesAdapter, categoriesAdapterInitialState, categoryApiSlice } from './categoryApi'
import { RootState } from '../../store/store'

export const selectCategoryResult = categoryApiSlice.endpoints.getCategories.select(undefined)

export const selectCategoryData = createSelector(
  selectCategoryResult,
  (result) => result.data
)

export const {
  selectAll: selectAllCategories,
  selectById: selectCategoryById,
  selectIds: selectCategoriesIds
} = categoriesAdapter.getSelectors<RootState>(
  (state) => selectCategoryData(state) ?? categoriesAdapterInitialState
)
