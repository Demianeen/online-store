import { IProduct } from './../../../http/productApi/productApi.types'
import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

export const productAdapter = createEntityAdapter<IProduct>({
  sortComparer: (a, b) => Number(b.isInStock) - Number(a.isInStock)
})

export const productAdapterInitialState = productAdapter.getInitialState()

const productSlice = createSlice({
  name: 'product',
  initialState: productAdapterInitialState,
  reducers: {
    addProducts: productAdapter.addMany,
    setProducts: productAdapter.setAll
  }
})

export const { addProducts, setProducts } = productSlice.actions

export default productSlice
