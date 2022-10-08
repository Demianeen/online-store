import { skipToken } from '@reduxjs/toolkit/dist/query'
import React from 'react'
import AppRouter from './components/AppRouter/AppRouter'
import { useGetCartItemsQuery } from './http/cartApi/cartApi'
import { useCheckQuery } from './http/userApi/userApi'
import withLayout from './layout/Layout'

const App = () => {
  const { data } = useCheckQuery(undefined)
  useGetCartItemsQuery(data?.user.id ?? skipToken)

  return (
    <AppRouter></AppRouter>
  )
}

export default withLayout(App)
