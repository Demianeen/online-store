import { ICartItem, CartItemCreate, ChangeCartItemQuantity, ChangeCartItemSize, ICartRaw } from './cartApi.types'
import { apiSlice } from '..'
// import jwtDecode from 'jwt-decode'
// import { IUserJWT } from '../../store/reducers/UserSlice/types'
import { createEntityAdapter, EntityState } from '@reduxjs/toolkit'
import jwtDecode from 'jwt-decode'
import { IUserJWT } from '../../store/reducers/UserSlice/types'

export const cartItemsAdapter = createEntityAdapter<ICartItem>({
  // Keeps the "all IDs" array sorted based on when cart item was created at
  sortComparer: (a, b) => a.createdAt - b.createdAt
})

export const cartItemsInitialState = cartItemsAdapter.getInitialState()

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCartItems: builder.query<EntityState<ICartItem>, number>({
      query: (UserId) => ({
        url: '/cart',
        params: {
          UserId
        }
      }),
      transformResponse: (responseData: ICartRaw) => {
        // parse stringified properties
        const parsedItems: ICartItem[] = responseData.Items.map((el) => ({
          ...el,
          createdAt: new Date(el.createdAt).getTime(),
          updatedAt: new Date(el.updatedAt).getTime()
        }))
        return cartItemsAdapter.setAll(cartItemsInitialState, parsedItems)
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
    changeItemQuantity: builder.mutation<ICartItem, ChangeCartItemQuantity>({
      query: ({ cartItemId, quantity }) => ({
        url: '/cart/item/quantity',
        method: 'POST',
        body: {
          id: cartItemId,
          quantity
        }
      }),
      async onQueryStarted ({ cartItemId, quantity }, { dispatch, queryFulfilled }) {
        const authToken = localStorage.getItem('token')
        if (authToken === null) return
        const CartId = jwtDecode<IUserJWT>(authToken).CartId

        const patchedResult = dispatch(
          cartApiSlice.util
            .updateQueryData('getCartItems', CartId, draft => {
              if (quantity > 0) {
                const entity = draft.entities[cartItemId]
                if (entity === undefined) return
                entity.quantity = quantity
              } else {
                if (draft === undefined) return
                let entity = draft.entities[cartItemId]
                entity = undefined
                return entity
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
    changeItemSize: builder.mutation<ICartItem, ChangeCartItemSize>({
      query: ({ cartItemId, size }) => ({
        url: '/cart/item/size',
        method: 'POST',
        body: {
          id: cartItemId,
          size
        }
      }),
      async onQueryStarted ({ cartItemId, size }, { dispatch, queryFulfilled }) {
        const authToken = localStorage.getItem('token')
        if (authToken === null) return
        const CartId = jwtDecode<IUserJWT>(authToken).CartId

        const patchedResult = dispatch(
          cartApiSlice.util
            .updateQueryData('getCartItems', CartId, draft => {
              const entity = draft.entities[cartItemId]
              if (entity === undefined) return
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
