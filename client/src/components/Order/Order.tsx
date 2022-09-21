import React from 'react'
import styles from './Order.module.css'
import cn from 'classnames'
import { IOrder } from './Order.types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { clearCart } from '../../http/cartApi'
import Button from '../Button/Button'
import { fetchCart } from '../../store/reducers/CartSlice/slice'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'

const Order = ({ children, className, ...props }: IOrder) => {
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(store => store.user)

  const navigate = useNavigate()

  const order = async () => {
    alert('Thanks for purchase')
    if (user === undefined) return alert('Internal error')
    await clearCart(user.CartId)
    dispatch(fetchCart(user.id))
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
