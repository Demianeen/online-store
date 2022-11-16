import React, { useEffect } from 'react'
import SideModal from '../SideModal/SideModal'
import { ICartControl } from './CartControl.types'
import styles from './CartControl.module.css'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../utils/consts'
import Button from '../../Button/Button'
import Order from '../../Order/Order'
import { useAppDispatch } from '../../../hooks/redux'
import { selectCartSubTotal, selectCartOverallQuantity, selectCartTax, selectCartItemIds } from '../../../http/cartApi/cartApiSelectors'
import { addNotification } from '../../../store/reducers/notificationSlice/notificationSliceActions'
import { useConvert } from '../../../hooks/currency'
import { useGetCartItemsQuery } from '../../../http/cartApi/cartApi'
import { useCheckQuery } from '../../../http/userApi/userApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import CartControlItem from '../../CartControlItem/CartControlItem'

const CartControl = ({ isVisible, setIsVisible, ...props }: ICartControl) => {
  const dispatch = useAppDispatch()

  const { data: userData } = useCheckQuery(undefined)
  const { tax, subTotal, overallQuantity, cartItemsIds } = useGetCartItemsQuery(userData?.user.id ?? skipToken, {
    selectFromResult: ({ data }) => ({
      tax: (data !== undefined) ? selectCartTax(data) : 0,
      subTotal: (data !== undefined) ? selectCartSubTotal(data) : 0,
      overallQuantity: (data !== undefined) ? selectCartOverallQuantity(data) : 0,
      cartItemsIds: (data !== undefined) ? selectCartItemIds(data) : []
    })
  })

  const navigate = useNavigate()

  const [convert, { symbol }] = useConvert()
  const convertedTax = convert(tax)
  const convertedSubtotal = convert(subTotal)

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
      <p className={styles.heading}><b className={styles.bold}>{'My bag'}</b>{', '}{overallQuantity}{' items'}</p>
      <div className={styles.scrollContainer}>
        {cartItemsIds.map(id => <CartControlItem key={ id} cartItemId={id}/>)}
      </div>
      <div className={styles.total}>
        <span className={styles.totalName}>{'Total'}</span>
        <span className={styles.totalValue}>
          {symbol}{convertedSubtotal + convertedTax}{'.00'}
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
        {/* because onclick already un button */}
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
