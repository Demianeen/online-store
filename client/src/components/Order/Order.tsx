import React from 'react'
import styles from './Order.module.css'
import cn from 'classnames'
import { IOrder } from './Order.types'
import { useAppSelector } from '../../hooks/redux'
import { useClearCartMutation } from '../../http/cartApi/cartApi'
import Button from '../Button/Button'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'

const Order = ({ children, className, ...props }: IOrder) => {
  const { user } = useAppSelector(store => store.user)

  const [clearCart] = useClearCartMutation()

  const navigate = useNavigate()

  const order = async () => {
    alert('Thanks for purchase')
    if (user === undefined) return alert('Internal error')
    clearCart(user.CartId)
    // await clearCart(user.CartId)
    // dispatch(fetchCart(user.id))
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
