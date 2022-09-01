import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import ErrorPage from '../../pages/404'
import { authRoutes, publicRoutes } from '../../routes'

const AppRouter = () => {
  const { isAuth } = useAppSelector(store => store.user)
  return (
    <Routes>
      {isAuth && authRoutes.map(({ path, Component }) =>
        <Route path={path} element={<Component />} key={path} />
      )}
      {publicRoutes.map(({ path, Component }) =>
        <Route path={path} element={<Component/>} key={path} />
      )}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  )
}

export default AppRouter
