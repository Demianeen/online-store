import { IUserJWT, IUserState } from './types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialState: IUserState = {
  isAuth: false,
  user: undefined
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
      action: PayloadAction<IUserJWT | undefined>
    ) {
      state.user = action.payload
    }
  }
})

export default userSlice

export const {
  setIsAuth,
  setUser
} = userSlice.actions
