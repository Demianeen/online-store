import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'
import { INotificationState, IPopup } from './notificationSlice.types'
import { addNotification, closeAlert, clearNotification, setAlert, withId, unhandledErrorNotification, setAlertResult } from './notificationSliceActions'

export const notificationAdapter = createEntityAdapter<IPopup>()

const adapterInitialState = notificationAdapter.getInitialState()

const initialState: INotificationState = {
  notifications: adapterInitialState
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(addNotification, (state, action) => {
        const { notifications } = state
        if (notifications.ids.length >= 3) {
          const firstEntityId = notifications.ids[0]
          notificationAdapter.removeOne(notifications, firstEntityId)
        }
        notificationAdapter.addOne(notifications, action.payload)
      })
      .addCase(clearNotification, (state, action) => {
        notificationAdapter.removeOne(state.notifications, action.payload)
      })
      .addCase(unhandledErrorNotification, (state) => {
        const notification: IPopup = withId({
          type: 'error',
          message: 'Something went wrong. Try again later.'
        })
        const { notifications } = state

        if (notifications.ids.length >= 3) {
          const firstEntityId = notifications.ids[0]
          notificationAdapter.removeOne(notifications, firstEntityId)
        }
        notificationAdapter.addOne(notifications, notification)
      })
      .addCase(setAlert, (state, action) => {
        state.alert = action.payload
      })
      .addCase(setAlertResult, (state, action) => {
        if (state.alert === undefined) return
        state.alert.returnValue = action.payload
      })
      .addCase(closeAlert, (state) => {
        state.alert = undefined
      })
  }
})
