import { ICartItem, ICart, CartItemCreate, ChangeCartItemQuantity, ChangeCartItemSize, ICartRaw } from './types'
import { apiSlice } from '..'
import jwtDecode from 'jwt-decode'
import { IUserJWT } from '../../store/reducers/UserSlice/types'

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query<ICart, number>({
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
          createdAt: new Date(el.createdAt),
          updatedAt: new Date(el.updatedAt)
        }))
        const parsedData: ICart = {
          ...responseData,
          Items: parsedItems,
          createdAt: new Date(responseData.createdAt),
          updatedAt: new Date(responseData.updatedAt)
        }

        parsedData.Items = parsedData.Items.sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
        )
        return parsedData
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
      invalidatesTags: ['cart'],
      async onQueryStarted ({ cartItemId, quantity }, { dispatch, queryFulfilled }) {
        const authToken = localStorage.getItem('token')
        if (authToken === null) return
        const CartId = jwtDecode<IUserJWT>(authToken).CartId

        const patchedResult = dispatch(
          cartApiSlice.util
            .updateQueryData('getCart', CartId, draft => {
              const cartItem = draft.Items.find(el => el.id === cartItemId)
              if (cartItem !== undefined) cartItem.quantity = quantity
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
            .updateQueryData('getCart', CartId, draft => {
              const cartItem = draft.Items.find(el => el.id === cartItemId)
              if (cartItem !== undefined) cartItem.size = size
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
  useGetCartQuery,
  useAddItemMutation,
  useChangeItemQuantityMutation,
  useChangeItemSizeMutation,
  useClearCartMutation,
  useLazyGetCartQuery,
  usePrefetch
} = cartApiSlice
