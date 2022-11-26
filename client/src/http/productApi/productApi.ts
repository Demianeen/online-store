import { IGetProducts, IProduct, IProductRaw, ProductCreate } from './productApi.types'
import { apiSlice } from '..'
import { createEntityAdapter } from '@reduxjs/toolkit'

export const productsAdapter = createEntityAdapter<IProduct>()

export const productsAdapterInitialState = productsAdapter.getInitialState()

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<IProduct[], IGetProducts>({
      keepUnusedDataFor: 600,
      query: (params) => ({
        url: '/product',
        params: {
          limit: params.limit,
          page: params.page,
          gender: params.selectedGender,
          brandId: params.selectedBrandId,
          categoryId: params.selectedCategoryId
        }
      }),
      transformResponse: (responseData: IProductRaw[]) => {
        // parse stringified properties
        const parsedProducts: IProduct[] = responseData.map((el) => ({
          ...el,
          sizes: JSON.parse(el.sizes),
          images: JSON.parse(el.images)
        }))
        return parsedProducts
      },
      providesTags: ['cart']
    }),
    getProductById: builder.query<IProduct, number | string>({
      query: (id) => ({
        url: `/product/${id}`
      }),
      transformResponse: (responseData: IProductRaw) => {
        // parse stringified properties
        const parsedProduct: IProduct = {
          ...responseData,
          sizes: JSON.parse(responseData.sizes),
          images: JSON.parse(responseData.images)
        }
        return parsedProduct
      }
    }),
    createProduct: builder.mutation<IProduct, ProductCreate>({
      query: (product) => ({
        url: '/product',
        method: 'POST',
        body: product
      }),
      invalidatesTags: ['cart']
    })
  })
})

export const {
  useCreateProductMutation,
  useGetProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useLazyGetProductsQuery,
  usePrefetch
} = productApiSlice

export const { endpoints, reducerPath, reducer, middleware } = productApiSlice
