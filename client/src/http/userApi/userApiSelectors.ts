import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store/store'
import { userApiSlice } from './userApi'

export const selectUserResult = (state: RootState) =>
  userApiSlice.endpoints.check.select(undefined)(state)

export const selectIsUserLogged = createSelector(
  selectUserResult,
  (result) => result.isSuccess
)

export const selectUserData = createSelector(
  selectUserResult,
  (result) => result.data
)

export const selectUser = createSelector(
  selectUserData,
  (data) => data?.user
)

export const selectUserCartId = createSelector(
  selectUser,
  (user) => user?.CartId
)

export const selectAuthToken = createSelector(
  selectUserData,
  (data) => data?.token
)
