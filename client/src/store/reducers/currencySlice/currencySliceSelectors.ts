import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'

export const selectCurrencyState = (state: RootState) => state.currency

export const selectCurrency = createSelector(
  selectCurrencyState,
  (state) => state.currency
)

export const selectExchangeRate = createSelector(
  selectCurrencyState,
  (state) => state.exchangeRate
)

export const selectCurrencyRates = createSelector(
  selectCurrencyState,
  (state) => state.rates
)

export const selectCurrencyOptions = createSelector(
  selectCurrencyState,
  (state) => state.options
)

export const selectCurrencySymbol = createSelector(
  selectCurrencyState,
  (state) => state.symbol
)
