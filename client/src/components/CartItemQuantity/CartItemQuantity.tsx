import React from 'react'
import styles from './CartItemQuantity.module.css'
import cn from 'classnames'
import { ICartItemProps } from './CartItemQuantity.types'
import { useChangeItemQuantityMutation, useGetCartItemsQuery } from '../../http/cartApi/cartApi'
import { selectCartItemById } from '../../http/cartApi/cartApiSelectors'
import { AlertWithReturn } from '../../store/reducers/notificationSlice/notificationSliceAlert'
import { IConfirmAlert } from '../../store/reducers/notificationSlice/notificationSlice.types'
import { useCheckQuery } from '../../http/userApi/userApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'

const CartItemQuantity = ({ cartItemId, className, ...props }: ICartItemProps) => {
  const { data: userData } = useCheckQuery(undefined)
  const { item } = useGetCartItemsQuery(userData?.user.CartId ?? skipToken, {
    selectFromResult: ({ data }) => ({
      item: (data != null) ? selectCartItemById(data, cartItemId) : undefined
    })
  })
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

  if (item === undefined) {
    return <></>
  }

  return (
    <div className={cn(styles.quantityContainer, className)} {...props}>
      <button
        onClick={async () => await increaseByOne(item.id, item.quantity)}
        className={styles.quantityButton}
      >
        <div className={styles.verticalLine}></div>
        <div className={styles.horizontalLine}></div>
      </button>
      <p className={styles.quantity}>{item.quantity}</p>
      <button
        onClick={async () => await decreaseByOne(item.id, item.quantity)}
        className={styles.quantityButton}
      >
        <div className={styles.horizontalLine}></div>
      </button>
    </div>
  )
}

export default CartItemQuantity
