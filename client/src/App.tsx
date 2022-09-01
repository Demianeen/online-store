import React from 'react'
import AppRouter from './components/AppRouter/AppRouter'
import withLayout from './layout/Layout'

const App = () => {
  return (
    <AppRouter></AppRouter>
  )
}

export default withLayout(App)
