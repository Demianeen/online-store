import { createSelector } from '@reduxjs/toolkit'
import { RootState } from '../../store'
import { notificationAdapter } from './notificationSlice'

export const selectNotificationState = (state: RootState) => state.notification

export const selectNotifications = createSelector(
  selectNotificationState,
  (notification) => notification.notifications
)

export const selectAlert = createSelector(
  selectNotificationState,
  (notification) => notification.alert
)

export const selectAlertResult = createSelector(
  selectAlert,
  (alert) => alert?.returnValue
)

export const { selectAll: selectAllPopups } = notificationAdapter
  .getSelectors<RootState>(selectNotifications)
