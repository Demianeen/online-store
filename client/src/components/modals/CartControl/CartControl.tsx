import React, { useEffect } from 'react'
import SideModal from '../SideModal/SideModal'
import { ICartControl } from './CartControl.types'
import styles from './CartControl.module.css'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../utils/consts'
import Button from '../../Button/Button'
import Order from '../../Order/Order'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { selectCartItemsIds } from '../../../http/cartApi/cartApiSelectors'
import { addNotification } from '../../../store/reducers/notificationSlice/notificationSliceActions'
import CartControlItem from '../../CartControlItem/CartControlItem'
import OverallCartQuantity from '../../OverallCartQuantity/OverallCartQuantity'
import CartTotal from '../../CartTotal/CartTotal'

const CartControl = ({ isVisible, setIsVisible, ...props }: ICartControl) => {
  const dispatch = useAppDispatch()

  const cartItemsIds = useAppSelector(selectCartItemsIds)

  const navigate = useNavigate()

  useEffect(() => {
    if (cartItemsIds[0] === undefined && isVisible) {
      setIsVisible(false)
      dispatch(addNotification({ type: 'error', message: 'Add items to the cart first.' }))
    }
  }, [cartItemsIds[0], isVisible])

  // TODO: Add loading and error handling

  if (!isVisible || cartItemsIds[0] === undefined) {
    return <></>
  }

  return (
    <SideModal className={styles.sideModal} {...props}>
      <p className={styles.heading}>
        <b className={styles.bold}>{'My bag'}</b>{', '}
        <OverallCartQuantity />
        {' items'}
      </p>
      <div className={styles.scrollContainer}>
        {cartItemsIds.map(id => <CartControlItem key={ id} cartItemId={id}/>)}
      </div>
      <div className={styles.total}>
        <span className={styles.totalName}>{'Total'}</span>
        <span className={styles.totalValue}>
          <CartTotal />
        </span>
      </div>
      <div className={styles.buttonContainer}>
        <Button
          onClick={() => { navigate(Routes.CART_ROUTE); setIsVisible(false) }}
          className={styles.button}
          buttonStyle={'ghost'}
        >
          {'View bag'}
        </Button>
        {/* because onclick already on button */}
        <div onClick={() => { setIsVisible(false) }}>
          <Order
            className={styles.button}
          >
            {'Check out'}
          </Order>
        </div>
      </div>
    </SideModal>
  )
}

export default CartControl
