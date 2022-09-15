import React, { MouseEvent, useState } from 'react'
import styles from './AddToCart.module.css'
import cn from 'classnames'
import { IAddToCart } from './AddToCart.types'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'
import CheckIcon from '../CheckIcon/CheckIcon'
import { ReactComponent as CartIcon } from './Cart.svg'
import { useAppSelector } from '../../hooks/redux'
import { addItem } from '../../http/cartApi'

const AddToCart = ({ productId, className, ...props }: IAddToCart) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false)

  const { user } = useAppSelector(store => store.user)

  const navigate = useNavigate()

  const addToCart =
    async (e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>, ProductId: number) => {
      try {
        e.stopPropagation()
        if (user !== undefined) {
          await addItem({ ProductId, CartId: user.CartId })

          setIsButtonPressed(true)
          setTimeout(() => setIsButtonPressed(false), 3000)
        } else {
          navigate(Routes.LOGIN_ROUTE)
        }
      } catch (error) {
        alert('You have already added this product to your cart.')
      }
    }

  return (
      <button
        className={cn(styles.button, className)}
        onClick={async (e) => await addToCart(e, productId)}
        {...props}
      >
        {isButtonPressed ? <CheckIcon /> : <CartIcon />}
      </button>
  )
}

export default AddToCart
