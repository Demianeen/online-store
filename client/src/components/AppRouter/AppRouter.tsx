import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useCheckQuery } from '../../http/userApi/userApi'
import ErrorPage from '../../pages/404'
import LoadingPage from '../../pages/Loading'
import { authRoutes, publicRoutes } from '../../routes'

const AppRouter = () => {
  const { isSuccess: isUserLogged, isLoading } = useCheckQuery(undefined)

  return (
    <Routes>
      {isUserLogged && authRoutes.map(({ path, Component }) =>
        <Route path={path} element={<Component />} key={path} />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route path={path} element={<Component/>} key={path} />
      )}
      {isLoading
        ? <Route path={'*'} element={<LoadingPage />} />
        : <Route path={'*'} element={<ErrorPage />} />
      }
    </Routes>
  )
}

export default AppRouter
