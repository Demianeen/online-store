import { selectCurrency, selectExchangeRate, selectCurrencySymbol } from './../store/reducers/currencySlice/currencySliceSelectors'
import { useAppSelector } from './redux'
import { useCallback } from 'react'

type Convert = (value: number) => number
interface IConvertHookAdditionalProperties {
  currency: string
  symbol: string
  exchangeRate: number
}

type returnType = [Convert, IConvertHookAdditionalProperties]
export const useConvert = (): returnType => {
  const currency = useAppSelector(selectCurrency)
  const exchangeRate = useAppSelector(selectExchangeRate)
  const symbol = useAppSelector(selectCurrencySymbol)

  const convert = useCallback(
    (value: number) => {
      return Math.floor(value * exchangeRate)
    },
    [currency]
  )

  return [convert, { currency, exchangeRate, symbol }]
}
