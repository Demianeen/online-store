import React from 'react'
import styles from './CartItemQuantity.module.css'
import cn from 'classnames'
import { ICartItemProps } from './CartItemQuantity.types'
import { useChangeItemQuantityMutation } from '../../http/cartApi/cartApi'

const CartItemQuantity = ({ cartItem, className, ...props }: ICartItemProps) => {
  // const dispatch = useAppDispatch()
  // const { setItemQuantity } = cartSlice.actions
  // const { user } = useAppSelector(store => store.user)

  const [changeItemQuantity] = useChangeItemQuantityMutation()

  const { id, quantity } = cartItem

  const increaseByOne = async (id: number, quantity: number) => {
    const increasedQuantity = quantity + 1

    changeItemQuantity({ cartItemId: id, quantity: increasedQuantity })

    // const changedQuantity = changeItemQuantity(id, increasedQuantity)
    // dispatch(setItemQuantity({ id, quantity: increasedQuantity }))

    // if (await changedQuantity === null || await changedQuantity === undefined) {
    //   dispatch(setItemQuantity({ id, quantity }))
    // }
  }

  const decreaseByOne = async (id: number, quantity: number) => {
    const decreasedQuantity = quantity - 1

    if (decreasedQuantity < 1) {
      const isDeleteConfirmed = confirm('Do you want to remove this item from cart?')
      if (!isDeleteConfirmed) return
    }
    changeItemQuantity({ cartItemId: id, quantity: decreasedQuantity })

    // const changedQuantity = changeItemQuantity(id, decreasedQuantity)
    // dispatch(setItemQuantity({ id, quantity: decreasedQuantity }))

    // if (await changedQuantity === null || await changedQuantity === undefined) {
    //   dispatch(setItemQuantity({ id, quantity }))
    //   alert('Error occurred')
    // }
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
