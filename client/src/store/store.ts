import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cartSlice from './reducers/CartSlice/slice'
import productSlice from './reducers/ProductSlice/slice'
import userSlice from './reducers/UserSlice/slice'

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [cartSlice.name]: cartSlice.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
