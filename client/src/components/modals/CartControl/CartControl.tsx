import React, { useEffect } from 'react'
import SideModal from '../SideModal/SideModal'
import { ICartControl } from './CartControl.types'
import styles from './CartControl.module.css'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../utils/consts'
import Button from '../../Button/Button'
import Order from '../../Order/Order'
import CartItemQuantity from '../../CartItemQuantity/CartItemQuantity'
import FullSizeImage from '../../FullSizeImage/FullSizeImage'
import CartItemSizes from '../../CartItemSizes/CartItemSizes'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { selectAllCartItems, selectCartSubTotal, selectCartOverallQuantity, selectCartTax } from '../../../http/cartApi/cartApiSelectors'
import { addNotification } from '../../../store/reducers/notificationSlice/notificationSliceActions'
import { useConvert } from '../../../hooks/currency'

const CartControl = ({ isVisible, setIsVisible, ...props }: ICartControl) => {
  const dispatch = useAppDispatch()

  const Items = useAppSelector(selectAllCartItems)

  const subTotal = useAppSelector(selectCartSubTotal)
  const overallQuantity = useAppSelector(selectCartOverallQuantity)
  const tax = useAppSelector(selectCartTax)

  const navigate = useNavigate()

  const [convert, { symbol }] = useConvert()
  const convertedTax = convert(tax)
  const convertedSubtotal = convert(subTotal)

  useEffect(() => {
    if (Items[0] === undefined && isVisible) {
      setIsVisible(false)
      dispatch(addNotification({ type: 'error', message: 'Add items to the cart first.' }))
    }
  }, [Items[0], isVisible])

  // TODO: Add loading and error handling

  if (!isVisible || Items[0] === undefined) {
    return <></>
  }

  return (
    <SideModal className={styles.sideModal} {...props}>
      <p className={styles.heading}><b className={styles.bold}>{'My bag'}</b>{', '}{overallQuantity}{' items'}</p>
      <div className={styles.scrollContainer}>
        {Items.map(({
          id,
          Product: {
            Brand: { name: brandName },
            Category: { name: categoryName },
            price,
            images
          }
        }) => {
          const convertedPrice = convert(price)
          const parsedImage = JSON.parse(images)[0]

          return (
            <div key={id} className={styles.product}>
              <div className={styles.productDescription}>

                <div className={styles.descriptionContainer}>
                  <div className={styles.descriptionHeadingContainer}>
                    <p className={styles.descriptionHeading}>{brandName}</p>
                    <p className={styles.descriptionHeading}>{categoryName}</p>
                  </div>
                  <p className={styles.price}>{symbol}{convertedPrice}{'.00'}</p>
                </div>

                <p className={styles.productDescriptionName}>{'Size:'}</p>
                <CartItemSizes
                  cartItemId={id}
                  sizesSize={'small'}
                />
              </div >
              <CartItemQuantity cartItemId={id} />
              <FullSizeImage src={parsedImage} />
            </div>
          )
        })}
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
