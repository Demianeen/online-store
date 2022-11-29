import { IProduct } from './../../../http/productApi/productApi.types'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { selectGender } from '../productParamsSlice/productParamsSliceActions'

export const productAdapter = createEntityAdapter<IProduct>({
  sortComparer: (a, b) => Number(b.isInStock) - Number(a.isInStock)
})

export const productAdapterInitialState = productAdapter.getInitialState()

const productSlice = createSlice({
  name: 'product',
  initialState: productAdapterInitialState,
  reducers: {
    addProducts: productAdapter.addMany
  },
  extraReducers: (builder) => {
    builder.addCase(selectGender, (state) => {
      productAdapter.removeAll(state)
    })
  }
})

export const { addProducts } = productSlice.actions

export default productSlice
