import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cartApiSlice } from '../http/cartApi/cartApi'
import { userApiSlice } from '../http/userApi/userApi'
import { listenerMiddleware } from './listener'
import { notificationSlice } from './reducers/notificationSlice/notificationSlice'
import productSlice from './reducers/ProductSlice/slice'

export const rootReducer = combineReducers({
  // here we use different endpoints as different slices to use them with typing
  // because we create them as different entities from indexApiSlice
  // and typing not preserved in indexApiSlice
  user: userApiSlice.reducer,
  cart: cartApiSlice.reducer,
  [notificationSlice.name]: notificationSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [cartApiSlice.reducerPath]: cartApiSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware).concat(cartApiSlice.middleware)
})

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
