import React, { useEffect } from 'react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import AppRouter from './components/AppRouter/AppRouter'
import { useGetCartItemsQuery } from './http/cartApi/cartApi'
import { useCheckQuery } from './http/userApi/userApi'
import withLayout from './layout/Layout'
import Notification from './components/Notification/Notification'
import AlertHandler from './components/AlertHandler/AlertHandler'
import { useFetchCurrencyRatesQuery } from './http/currencyApi/currencyApi'
import { useAppDispatch } from './hooks/redux'
import { setCurrencyRates } from './store/reducers/currencySlice/currencySliceActions'

const App = () => {
  const dispatch = useAppDispatch()

  const { data: userData } = useCheckQuery(undefined)
  const { data: currencyData, isSuccess } = useFetchCurrencyRatesQuery(undefined)
  useGetCartItemsQuery(userData?.user.id ?? skipToken)

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrencyRates(currencyData))
    }
  }, [currencyData])

  return (
    <>
      <AppRouter></AppRouter>
      <Notification />
      <AlertHandler />
    </>
  )
}

export default withLayout(App)
