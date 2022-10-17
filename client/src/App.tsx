import React from 'react'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import AppRouter from './components/AppRouter/AppRouter'
import { useGetCartItemsQuery } from './http/cartApi/cartApi'
import { useCheckQuery } from './http/userApi/userApi'
import withLayout from './layout/Layout'
import Notification from './components/Notification/Notification'
import AlertHandler from './components/AlertHandler/AlertHandler'

const App = () => {
  const { data } = useCheckQuery(undefined)
  useGetCartItemsQuery(data?.user.id ?? skipToken)

  return (
    <>
      <AppRouter></AppRouter>
      <Notification />
      <AlertHandler />
    </>
  )
}

export default withLayout(App)
