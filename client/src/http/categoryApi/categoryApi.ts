import { ICategory, CategoryCreate, ICategoryRaw } from './categoryApi.types'
import { apiSlice } from '..'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'

export const categoriesAdapter = createEntityAdapter<ICategoryRaw>()

export const categoriesAdapterInitialState = categoriesAdapter.getInitialState()

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<EntityState<ICategoryRaw>, undefined>({
      query: () => ({
        url: '/category'
      }),
      transformResponse: (responseData: ICategoryRaw[]) => {
        return categoriesAdapter.setAll(categoriesAdapterInitialState, responseData)
      },
      providesTags: ['cart']
    }),
    createCategory: builder.mutation<ICategory, CategoryCreate>({
      query: (category) => ({
        url: '/category',
        method: 'POST',
        body: category
      }),
      invalidatesTags: ['cart']
    })
  })
})

export const {
  useGetCategoriesQuery,
  useLazyGetCategoriesQuery,
  useCreateCategoryMutation,
  usePrefetch
} = categoryApiSlice

export const { endpoints, reducerPath, reducer, middleware } = categoryApiSlice
