import React, { MouseEvent, useState } from 'react'
import styles from './AddToCart.module.css'
import cn from 'classnames'
import { IAddToCart } from './AddToCart.types'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'
import CheckIcon from '../CheckIcon/CheckIcon'
import { ReactComponent as CartIcon } from './Cart.svg'
import { useAppSelector } from '../../hooks/redux'
import Button from '../Button/Button'
import { useAddItemMutation } from '../../http/cartApi/cartApi'
import { isErrorWithMessage, isFetchBaseQueryError } from '../../http/error'

const AddToCart = ({ productId, size, isInStock, buttonSize, className, ...props }: IAddToCart) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const { user } = useAppSelector(store => store.user)
  const [addItem, { isLoading }] = useAddItemMutation()

  const navigate = useNavigate()

  const addToCart =
    async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, ProductId: number) => {
      e.stopPropagation()
      if (user === undefined) {
        navigate(Routes.LOGIN_ROUTE)
        return
      }
      if (!isInStock) return alert('Sorry. This item is unavailable right now. Try again later')
      if (isLoading) return

      try {
        await addItem({ CartId: user.id, ProductId, size }).unwrap()

        setIsButtonPressed(true)
        setTimeout(() => setIsButtonPressed(false), 3000)
      } catch (error) {
        if (isFetchBaseQueryError(error)) {
          const errMsg = 'error' in error ? error.error : error.data
          if (isErrorWithMessage(errMsg)) {
            return alert(errMsg.message)
          }
          alert(JSON.stringify(errMsg))
        } else if (isErrorWithMessage(error)) {
          alert(error.message)
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
