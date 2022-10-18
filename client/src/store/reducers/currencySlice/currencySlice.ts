import { createSlice } from '@reduxjs/toolkit'
import { CurrencySymbols, ICurrencyState } from './currencySlice.types'
import { changeCurrency, setCurrencyRates } from './currencySliceActions'

const defaultCurrency = 'USD'

export const currencySymbols = {
  USD: '$', // US Dollar
  EUR: '€', // Euro
  UAH: '₴' // Ukrainian Hryvnia
}

const isSupportedCurrency = (currency: string): currency is CurrencySymbols => {
  const symbolsArray = Object.keys(currencySymbols)
  const result = symbolsArray.find((el) => el === currency)
  return result !== undefined
}

export const getCurrencySymbol = (currency: string) => {
  if (isSupportedCurrency(currency)) {
    return currencySymbols[currency]
  }
  // ua-UA just to load page. Here can be any other local.
  // It only matter if we need currency format
  const res = (0)
    .toLocaleString('en-GB',
      {
        style: 'currency',
        currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      })
    .replace(/\d/g, '').trim()
  return res
}

const initialState: ICurrencyState = {
  rates: {},
  options: [],
  currency: defaultCurrency,
  exchangeRate: 1,
  symbol: getCurrencySymbol(defaultCurrency)
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(setCurrencyRates, (state, action) => {
        const { rates } = action.payload

        state.rates = rates
        state.options = Object.keys(rates)
        state.exchangeRate = rates[defaultCurrency]
      })
      .addCase(changeCurrency, (state, action) => {
        const newCurrency = action.payload

        state.currency = newCurrency
        state.exchangeRate = state.rates[newCurrency]
        state.symbol = getCurrencySymbol(newCurrency)
      })
  }
})
