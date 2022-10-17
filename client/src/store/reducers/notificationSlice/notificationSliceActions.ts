import { createAction, nanoid } from '@reduxjs/toolkit'
import { AlertsWithReturn, AlertResult, CreatePopup } from './notificationSlice.types'

export const withId = <T>(obj: T) => ({
  ...obj,
  id: nanoid()
})

export const addNotification =
  createAction('notification/addPopup', (popup: CreatePopup) => ({
    payload: withId(popup)
  }))
export const clearNotification = createAction<string>('notification/closePopup')

export const unhandledErrorNotification = createAction('notification/addUnhandledErrorNotification')

export const setAlert = createAction<AlertsWithReturn>('notification/setAlert')
export const setAlertResult = createAction<AlertResult<AlertsWithReturn>>('notification/setAlertResult')
export const closeAlert = createAction('notification/closeAlert')
