import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from './components/AppRouter/AppRouter'

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <AppRouter></AppRouter>
    </BrowserRouter>
  )
}

export default App
