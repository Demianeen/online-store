import { store } from '../../store'
import { AlertsWithReturn, AlertResult, AlertWithReturnType } from './notificationSlice.types'
import { setAlert, closeAlert } from './notificationSliceActions'
import { selectAlertResult } from './notificationSliceSelectors'

export const AlertWithReturn = async <T extends AlertsWithReturn>(alert: AlertWithReturnType<T>) => {
  const promise = new Promise<AlertResult<T>>((resolve, _reject) => {
    store.dispatch(setAlert(alert))
    store.subscribe(() => {
      const result = selectAlertResult(store.getState())
      if (result !== undefined) {
        return resolve(result)
      }
    })
  })

  const promised = await promise
  store.dispatch(closeAlert())

  return promised
}
