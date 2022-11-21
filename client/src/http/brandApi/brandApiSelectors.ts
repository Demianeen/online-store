import { createSelector } from '@reduxjs/toolkit'
import { brandsAdapter, brandsAdapterInitialState, brandApiSlice } from './brandApi'
import { RootState } from '../../store/store'

export const selectBrandResult = brandApiSlice.endpoints.getBrands.select(undefined)

export const selectBrandData = createSelector(
  selectBrandResult,
  (result) => result.data
)

export const {
  selectAll: selectAllBrands,
  selectById: selectBrandById,
  selectIds: selectBrandsIds
} = brandsAdapter.getSelectors<RootState>((state) => selectBrandData(state) ?? brandsAdapterInitialState)
