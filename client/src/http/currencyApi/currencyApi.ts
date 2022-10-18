import { apiSlice } from '..'
import { ICurrencyApiResponse } from './currencyApi.types'

export const currencyApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchCurrencyRates: builder.query<ICurrencyApiResponse, undefined>({
      query: () => ({
        url: `${process.env.REACT_APP_CURRENCY_API_URL}/latest`,
        params: {
          base: 'USD',
          symbols: ['USD', 'EUR', 'UAH']
        },
        headers: {
          apikey: process.env.REACT_APP_CURRENCY_APIKEY
        }
      })
    })
  })
})

export const { useFetchCurrencyRatesQuery } = currencyApiSlice
