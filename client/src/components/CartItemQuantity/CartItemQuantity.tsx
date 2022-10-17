import React from 'react'
import styles from './CartItemQuantity.module.css'
import cn from 'classnames'
import { ICartItemProps } from './CartItemQuantity.types'
import { useChangeItemQuantityMutation } from '../../http/cartApi/cartApi'
import { useAppSelector } from '../../hooks/redux'
import { selectCartItemById } from '../../http/cartApi/cartApiSelectors'
import { AlertWithReturn } from '../../store/reducers/notificationSlice/notificationSliceAlert'
import { IConfirmAlert } from '../../store/reducers/notificationSlice/notificationSlice.types'

const CartItemQuantity = ({ cartItemId, className, ...props }: ICartItemProps) => {
  // we can assure that item will defined because we pass ids from server
  // eslint-disable-next-line
  const { id, quantity } = useAppSelector(state => selectCartItemById(state, cartItemId))!
  const [changeItemQuantity] = useChangeItemQuantityMutation()

  const increaseByOne = async (id: number, quantity: number) => {
    const increasedQuantity = quantity + 1

    changeItemQuantity({ cartItemId: id, quantity: increasedQuantity })
  }

  const decreaseByOne = async (id: number, quantity: number) => {
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

    changeItemQuantity({ cartItemId: id, quantity: decreasedQuantity })
  }

  return (
    <div className={cn(styles.quantityContainer, className)} {...props}>
      <button
        onClick={async () => await increaseByOne(id, quantity)}
        className={styles.quantityButton}
      >
        <div className={styles.verticalLine}></div>
        <div className={styles.horizontalLine}></div>
      </button>
      <p className={styles.quantity}>{quantity}</p>
      <button
        onClick={async () => await decreaseByOne(id, quantity)}
        className={styles.quantityButton}
      >
        <div className={styles.horizontalLine}></div>
      </button>
    </div>
  )
}

export default CartItemQuantity
