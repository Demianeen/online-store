import { apiSlice } from '..'
import { IRegisterBody, IUserApiState, IUserJWT } from './userApi.types'
import jwtDecode from 'jwt-decode'

const transformData = (token: string): IUserApiState => {
  localStorage.setItem('token', token)
  const decoded = jwtDecode<IUserJWT>(token)

  return {
    user: decoded,
    token
  }
}

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    registration: builder.mutation<IUserApiState, IRegisterBody>({
      query: (args) => ({
        url: '/user/registration',
        method: 'POST',
        body: args
      }),
      invalidatesTags: ['cart'],
      transformResponse (baseQueryReturnValue: string) {
        return transformData(baseQueryReturnValue)
      }
    }),
    login: builder.mutation<IUserApiState, IRegisterBody>({
      query: (args) => ({
        url: '/user/login',
        method: 'POST',
        body: args
      }),
      invalidatesTags: ['cart'],
      transformResponse (baseQueryReturnValue: string, meta, args) {
        return transformData(baseQueryReturnValue)
      }
    }),
    check: builder.query<IUserApiState, undefined>({
      query: () => '/user/auth',
      transformResponse (baseQueryReturnValue: string) {
        return transformData(baseQueryReturnValue)
      }
    })
  })
})

export const {
  useCheckQuery,
  useLazyCheckQuery,
  useLoginMutation,
  useRegistrationMutation,
  usePrefetch
} = userApiSlice

export const { endpoints, reducerPath, reducer, middleware } = userApiSlice
