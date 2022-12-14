import React from 'react'
import styles from './Order.module.css'
import cn from 'classnames'
import { IOrder } from './Order.types'
import { useClearCartMutation } from '../../http/cartApi/cartApi'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'
import { useCheckQuery } from '../../http/userApi/userApi'
import { useAppDispatch } from '../../hooks/redux'
import { addNotification, unhandledErrorNotification } from '../../store/reducers/notificationSlice/notificationSliceActions'

const Order = ({ children, className, ...props }: IOrder) => {
  const dispatch = useAppDispatch()

  const { data: userData, isSuccess: isUserLogged } = useCheckQuery(undefined)

  const [clearCart] = useClearCartMutation()

  const navigate = useNavigate()

  const order = async () => {
    dispatch(addNotification({
      type: 'success',
      message: 'Thanks for purchase'
    }))
    if (!isUserLogged) return dispatch(unhandledErrorNotification())
    clearCart(userData.user.CartId)
    navigate(Routes.SHOP_ROUTE)
  }

  return (
    <Button
      onClick={async () => await order()}
      className={cn(styles.button, className)}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Order
