import { IConfirmAlert } from './../store/reducers/notificationSlice/notificationSlice.types'
import { AlertWithReturn } from './../store/reducers/notificationSlice/notificationSliceAlert'
import { useNavigate } from 'react-router-dom'
import { userApiSlice } from '../http/userApi/userApi'
import { Routes } from '../utils/consts'
import { useAppDispatch } from './redux'

export const useSignOut = () => {
  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const signOut = async () => {
    const isConfirmed = await AlertWithReturn<IConfirmAlert>({
      type: 'submit',
      title: 'Confirm Operation',
      description: 'Do you want to sign out?',
      confirmLabel: 'Sign Out'
    })
    if (!isConfirmed) return
    localStorage.removeItem('token')
    dispatch(userApiSlice.util.resetApiState())

    navigate(Routes.SHOP_ROUTE)
  }

  return signOut
}
