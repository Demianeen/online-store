import { ICategory, CategoryCreate, ICategoryRaw } from './brandApi.types'
import { apiSlice } from '..'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'

export const brandsAdapter = createEntityAdapter<ICategoryRaw>()

export const brandsAdapterInitialState = brandsAdapter.getInitialState()

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBrands: builder.query<EntityState<ICategoryRaw>, undefined>({
      query: () => ({
        url: '/brand'
      }),
      transformResponse: (responseData: ICategoryRaw[]) => {
        return brandsAdapter.setAll(brandsAdapterInitialState, responseData)
      },
      providesTags: ['cart']
    }),
    createBrand: builder.mutation<ICategory, CategoryCreate>({
      query: (category) => ({
        url: '/brand',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['cart']
    })
  })
})

export const {
  useCreateBrandMutation,
  useGetBrandsQuery,
  useLazyGetBrandsQuery,
  usePrefetch
} = brandApiSlice

export const { endpoints, reducerPath, reducer, middleware } = brandApiSlice
