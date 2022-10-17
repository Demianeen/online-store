import React, { MouseEvent, useState } from 'react'
import styles from './AddToCart.module.css'
import cn from 'classnames'
import { IAddToCart } from './AddToCart.types'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'
import CheckIcon from '../CheckIcon/CheckIcon'
import { ReactComponent as CartIcon } from './Cart.svg'
import Button from '../Button/Button'
import { useAddItemMutation } from '../../http/cartApi/cartApi'
import { isErrorWithMessage, isFetchBaseQueryError } from '../../http/error'
import { useCheckQuery } from '../../http/userApi/userApi'
import { addNotification, unhandledErrorNotification } from '../../store/reducers/notificationSlice/notificationSliceActions'
import { useAppDispatch } from '../../hooks/redux'

const AddToCart = ({ productId, size, isInStock, buttonSize, className, ...props }: IAddToCart) => {
  const dispatch = useAppDispatch()

  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const { data: userData, isSuccess: isUserLogged } = useCheckQuery(undefined)
  const [addItem, { isLoading }] = useAddItemMutation()

  const navigate = useNavigate()

  const addToCart =
    async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, ProductId: number) => {
      e.stopPropagation()
      if (!isUserLogged) {
        navigate(Routes.LOGIN_ROUTE)
        return
      }

      if (!isInStock) {
        return dispatch(addNotification({
          type: 'error',
          message: 'This item is unavailable right now. Try again later.'
        }))
      }
      if (isLoading) return

      try {
        await addItem({ CartId: userData.user.CartId, ProductId, size }).unwrap()

        setIsButtonPressed(true)
        setTimeout(() => setIsButtonPressed(false), 3000)
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          if (isErrorWithMessage(error.data)) {
            return dispatch(addNotification({
              type: 'error',
              message: error.data.message
            }))
          }
          dispatch(unhandledErrorNotification())
        } else if (isErrorWithMessage(error)) {
          dispatch(addNotification({ type: 'error', message: error.message }))
        }
      }
    }

  if (buttonSize === 'small') {
    return (
      <button
        className={cn(styles.smallButton, className)}
        onClick={async (e) => await addToCart(e, productId)}
        {...props}
      >
        {isButtonPressed ? <CheckIcon /> : <CartIcon />}
      </button>
    )
  }

  if (buttonSize === 'large') {
    return (
      <Button
        onClick={async (e) => await addToCart(e, productId)}
      >
        {isButtonPressed ? <CheckIcon /> : 'ADD TO CART'}
      </Button>
    )
  }

  throw new Error('Invalid size value')
}

export default AddToCart
