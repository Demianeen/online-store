import { RootState } from './../../store/store'
import { unhandledErrorNotification } from './../../store/reducers/notificationSlice/notificationSliceActions'
import { ICartItem, CartItemCreate, IChangeCartItemQuantity, IChangeCartItemSize, ICartItemRaw } from './cartApi.types'
import { apiSlice } from '..'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import { selectUser } from '../userApi/userApiSelectors'

export const cartItemsAdapter = createEntityAdapter<ICartItem>({
  // Keeps the "all IDs" array sorted based on when cart item was created at
  sortComparer: (a, b) => a.createdAt - b.createdAt
})

export const cartItemsAdapterInitialState = cartItemsAdapter.getInitialState()

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<EntityState<ICartItem>, number>({
      query: (CartId) => ({
        url: '/cart/item',
        params: {
          CartId
        }
      }),
      transformResponse: (responseData: ICartItemRaw[]) => {
        // parse stringified properties
        const parsedItems: ICartItem[] = responseData.map((el) => ({
          ...el,
          createdAt: new Date(el.createdAt).getTime(),
          updatedAt: new Date(el.updatedAt).getTime()
        }))
        return cartItemsAdapter.setAll(cartItemsAdapterInitialState, parsedItems)
      },
      providesTags: ['cart']
    }),
    clearCart: builder.mutation<number, number>({
      query: (CartId) => ({
        url: '/cart/item/remove',
        method: 'POST',
        body: {
          CartId
        }
      }),
      invalidatesTags: ['cart']
    }),

    addItem: builder.mutation<ICartItem, CartItemCreate>({
      query: (cartItem) => ({
        url: '/cart/item',
        method: 'POST',
        body: cartItem
      }),
      invalidatesTags: ['cart']
    }),
    changeItemQuantity: builder.mutation<ICartItem, IChangeCartItemQuantity>({
      query: ({ cartItemId, quantity }) => ({
        url: '/cart/item/quantity',
        method: 'POST',
        body: {
          id: cartItemId,
          quantity
        }
      }),
      async onQueryStarted ({ cartItemId, quantity }, { dispatch, queryFulfilled, getState }) {
        const user = selectUser(getState() as RootState)
        if (user === undefined) {
          dispatch(unhandledErrorNotification())
          return
        }

        const patchedResult = dispatch(
          cartApiSlice.util
            .updateQueryData('getCartItems', user.CartId, draft => {
              const entity = draft.entities[cartItemId]
              if (entity === undefined) return
              if (quantity !== 0) {
                entity.quantity = quantity
              } else {
                cartItemsAdapter.removeOne(cartItemsAdapterInitialState, cartItemId)
              }
            })
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchedResult.undo()
        }
      }
    }),
    changeItemSize: builder.mutation<ICartItem, IChangeCartItemSize>({
      query: ({ cartItemId, size }) => ({
        url: '/cart/item/size',
        method: 'POST',
        body: {
          id: cartItemId,
          size
        }
      }),
      async onQueryStarted ({ cartItemId, size }, { dispatch, queryFulfilled, getState }) {
        const user = selectUser(getState() as RootState)
        if (user === undefined) {
          dispatch(unhandledErrorNotification())
          return
        }

        const patchedResult = dispatch(
          cartApiSlice.util
            .updateQueryData('getCartItems', user.CartId, draft => {
              const entity = draft.entities[cartItemId]
              if (entity === undefined) {
                dispatch(unhandledErrorNotification())
                return
              }
              entity.size = size
            })
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchedResult.undo()
        }
      }
    })
  })
})

export const {
  useGetCartItemsQuery,
  useAddItemMutation,
  useChangeItemQuantityMutation,
  useChangeItemSizeMutation,
  useClearCartMutation,
  useLazyGetCartItemsQuery,
  usePrefetch
} = cartApiSlice

export const { endpoints, reducerPath, reducer, middleware } = cartApiSlice
