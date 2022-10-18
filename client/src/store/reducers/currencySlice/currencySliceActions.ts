import { createAction } from '@reduxjs/toolkit'
import { ICurrencyApiResponse } from '../../../http/currencyApi/currencyApi.types'

export const setCurrencyRates = createAction<ICurrencyApiResponse>('currency/setCurrencyRates')
export const changeCurrency = createAction<string>('currency/changeCurrency')
