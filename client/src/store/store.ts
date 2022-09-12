import { combineReducers, configureStore } from '@reduxjs/toolkit'
import productSlice from './reducers/ProductSlice/slice'
import userSlice from './reducers/UserSlice/slice'

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [productSlice.name]: productSlice.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
