import { IUserState } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IUserState = {
  isAuth: false,
  user: {}
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth (
      state: IUserState,
      action: PayloadAction<boolean>
    ) {
      state.isAuth = action.payload
    },
    setUser (
      state: IUserState,
      action: PayloadAction<Record<string, any>>
    ) {
      state.user = action.payload
    }
  }
})

export default userSlice
