import React from 'react'
import styles from './CartItemQuantity.module.css'
import cn from 'classnames'
import { ICartItemProps } from './CartItemQuantity.types'
import { useChangeItemQuantityMutation } from '../../http/cartApi/cartApi'
import { selectCartItemQuantityById } from '../../http/cartApi/cartApiSelectors'
import { AlertWithReturn } from '../../store/reducers/notificationSlice/notificationSliceAlert'
import { IConfirmAlert } from '../../store/reducers/notificationSlice/notificationSlice.types'
import { useAppSelector } from '../../hooks/redux'

const CartItemQuantity = ({ cartItemId, className, ...props }: ICartItemProps) => {
  const quantity = useAppSelector(state => selectCartItemQuantityById(state, cartItemId))
  const [changeItemQuantity] = useChangeItemQuantityMutation()

  const increaseByOne = async (quantity: number) => {
    const increasedQuantity = quantity + 1

    changeItemQuantity({ cartItemId, quantity: increasedQuantity })
  }

  const decreaseByOne = async (quantity: number) => {
    const decreasedQuantity = quantity - 1

    if (decreasedQuantity < 1) {
      const isDeleteConfirmed = await AlertWithReturn<IConfirmAlert>({
        type: 'submit',
        title: 'Confirm Operation',
        description: 'Do you want to remove this item from your Cart?',
        confirmLabel: 'Remove'
      })
      if (!isDeleteConfirmed) return
    }

    changeItemQuantity({ cartItemId, quantity: decreasedQuantity })
  }

  if (quantity === undefined) {
    return <></>
  }

  return (
    <div className={cn(styles.quantityContainer, className)} {...props}>
      <button
        onClick={async () => await increaseByOne(quantity)}
        className={styles.quantityButton}
      >
        <div className={styles.verticalLine}></div>
        <div className={styles.horizontalLine}></div>
      </button>
      <p className={styles.quantity}>{quantity}</p>
      <button
        onClick={async () => await decreaseByOne(quantity)}
        className={styles.quantityButton}
      >
        <div className={styles.horizontalLine}></div>
      </button>
    </div>
  )
}

export default CartItemQuantity
