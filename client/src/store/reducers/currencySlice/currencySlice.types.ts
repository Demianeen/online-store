import { currencySymbols } from './currencySlice'

export interface ICurrencyState {
  rates: Record<string, number>
  options: string[]
  currency: string
  exchangeRate: number
  symbol: string
}

export type CurrencySymbols = keyof typeof currencySymbols
