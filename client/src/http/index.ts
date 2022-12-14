import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  tagTypes: ['cart', 'brand', 'category', 'products'],
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL + 'api',
    prepareHeaders: (headers, api) => {
      const authToken = localStorage.getItem('token')
      if (authToken === null || api.endpoint === 'fetchCurrencyRates') return headers
      headers.append('authorization', `Bearer ${authToken}`)
      return headers
    }
  }),
  endpoints: (build) => ({

  })
})
