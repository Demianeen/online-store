import { EntityState } from '@reduxjs/toolkit'

export interface INotificationState {
  alert?: AlertsWithReturn
  notifications: EntityState<IPopup>
}

export interface IConfirmAlert {
  type: 'submit'
  title: string
  description: string
  confirmLabel?: string
  returnValue?: boolean
}

export type AlertsWithReturn = IConfirmAlert

export type AlertResult<T extends AlertsWithReturn> = NonNullable<T['returnValue']>
export type AlertWithReturnType<T extends AlertsWithReturn> = T

export interface IPopup {
  id: string
  message: string
  type: 'error' | 'success'
}

export type CreatePopup = Omit<IPopup, 'id'>
