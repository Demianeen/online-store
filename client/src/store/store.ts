import { combineReducers, configureStore } from '@reduxjs/toolkit'
import deviceSlice from './reducers/DeviceSlice/slice'
import userSlice from './reducers/UserSlice/slice'

export const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [deviceSlice.name]: deviceSlice.reducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
