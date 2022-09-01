import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux/es/exports'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { setupStore } from './store/store'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container)

const store = setupStore()

root.render(
  <Provider store={ store }>
    <App />
  </Provider>

)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
