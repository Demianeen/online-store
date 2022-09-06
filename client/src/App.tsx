import React, { useEffect, useState } from 'react'
import AppRouter from './components/AppRouter/AppRouter'
import { useAppDispatch } from './hooks/redux'
import { check } from './http/userApi'
import withLayout from './layout/Layout'
import userSlice from './store/reducers/UserSlice/slice'

const App = () => {
  const dispatch = useAppDispatch()
  const { setUser, setIsAuth } = userSlice.actions

  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const authUser = async () => {
      const response = await check()
      if (response !== undefined) {
        dispatch(setUser(response))
        dispatch(setIsAuth(true))
      }
      return response
    }

    authUser()
    setLoading(false)
  }, [])

  if (loading) {
    return <div>{'Loading...'}</div>
  }

  return (
    <AppRouter></AppRouter>
  )
}

export default withLayout(App)
