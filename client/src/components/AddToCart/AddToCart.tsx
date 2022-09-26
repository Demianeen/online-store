import React, { MouseEvent, useState } from 'react'
import styles from './AddToCart.module.css'
import cn from 'classnames'
import { IAddToCart } from './AddToCart.types'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'
import CheckIcon from '../CheckIcon/CheckIcon'
import { ReactComponent as CartIcon } from './Cart.svg'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { addItem } from '../../http/cartApi'
import Button from '../Button/Button'
import { fetchCart } from '../../store/reducers/CartSlice/slice'

const AddToCart = ({ productId, size, isInStock, buttonSize, className, ...props }: IAddToCart) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const dispatch = useAppDispatch()
  const { user } = useAppSelector(store => store.user)

  const navigate = useNavigate()

  const addToCart =
    async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, ProductId: number) => {
      try {
        e.stopPropagation()
        if (user !== undefined) {
          if (!isInStock) return alert('Sorry. This item is unavailable right now. Try again later')
          await addItem({ size, ProductId, CartId: user.CartId })
          dispatch(fetchCart(user.id))

          setIsButtonPressed(true)
          setTimeout(() => setIsButtonPressed(false), 3000)
        } else {
          navigate(Routes.LOGIN_ROUTE)
        }
      } catch (error) {
        alert('You have already added this product to your cart.')
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
