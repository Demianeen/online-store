import { categoryApiSlice } from '../http/categoryApi/categoryApi'
import { currencySlice } from './reducers/currencySlice/currencySlice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartApiSlice } from '../http/cartApi/cartApi'
import { userApiSlice } from '../http/userApi/userApi'
import { listenerMiddleware } from './listener'
import { notificationSlice } from './reducers/notificationSlice/notificationSlice'
import productParamsSlice from './reducers/productParamsSlice/productParamsSlice'
import { apiSlice } from '../http'
import productSlice from './reducers/productSlice/productSlice'

export const rootReducer = combineReducers({
  // here we use different endpoints as different slices to use them with typing
  // because we create them as different entities from indexApiSlice
  // and typing not preserved in indexApiSlice
  userApi: userApiSlice.reducer,
  cartApi: cartApiSlice.reducer,
  currencyApi: currencySlice.reducer,
  categoryApi: categoryApiSlice.reducer,
  [currencySlice.name]: currencySlice.reducer,
  [notificationSlice.name]: notificationSlice.reducer,
  [productParamsSlice.name]: productParamsSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [apiSlice.reducerPath]: apiSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(cartApiSlice.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
