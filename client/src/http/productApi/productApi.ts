import { IGetProducts, IProduct, IProductRaw, ProductCreate } from './productApi.types'
import { apiSlice } from '..'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'

export const productsAdapter = createEntityAdapter<IProduct>()

export const productsAdapterInitialState = productsAdapter.getInitialState()

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<EntityState<IProduct>, IGetProducts>({
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
        return productsAdapter.setAll(productsAdapterInitialState, parsedProducts)
      },
      providesTags: ['cart']
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
  useLazyGetProductsQuery,
  usePrefetch
} = productApiSlice

export const { endpoints, reducerPath, reducer, middleware } = productApiSlice

export const {
  selectAll: selectAllProducts,
  selectById: selectProductById,
  selectIds: selectProductsIds,
  selectTotal: selectProductsQuantity,
  selectEntities: selectProductEntities
} = productsAdapter.getSelectors()
