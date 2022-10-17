import { createListenerMiddleware } from '@reduxjs/toolkit'
import { addNotification, clearNotification } from './reducers/notificationSlice/notificationSliceActions'

export const listenerMiddleware = createListenerMiddleware()

// TODO: move to different file
listenerMiddleware.startListening({
  actionCreator: addNotification,
  effect: async (action, { delay, dispatch }) => {
    await delay(3000)
    dispatch(clearNotification(action.payload.id))
  }
})
