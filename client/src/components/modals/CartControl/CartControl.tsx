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
import { useAppSelector } from '../../../hooks/redux'
import { selectAllCartItems, selectCartSubTotal, selectCartOverallQuantity, selectCartTax } from '../../../http/cartApi/cartApiSelectors'

const CartControl = ({ isVisible, setIsVisible, ...props }: ICartControl) => {
  const Items = useAppSelector(selectAllCartItems)

  const subTotal = useAppSelector(selectCartSubTotal)
  const overallQuantity = useAppSelector(selectCartOverallQuantity)
  const tax = useAppSelector(selectCartTax)

  const navigate = useNavigate()

  useEffect(() => {
    if (Items[0] === undefined && isVisible) {
      setIsVisible(false)
      alert('Add items to the cart first.')
    }
  }, [Items[0], isVisible])

  // TODO: Add loading and error handling

  if (!isVisible) {
    return <></>
  }

  return (
    <SideModal className={styles.sideModal} {...props}>
      <p className={styles.heading}><b className={styles.bold}>{'My bag'}</b>{', '}{overallQuantity}{' items'}</p>
      <div className={styles.scrollContainer}>
        {Items.map((item) =>
          <div key={item.id} className={styles.product}>
            <div className={styles.productDescription}>

              <div className={styles.descriptionContainer}>
                <div className={styles.descriptionHeadingContainer}>
                  <p className={styles.descriptionHeading}>{item.Product.Brand.name}</p>
                  <p className={styles.descriptionHeading}>{item.Product.Category.name}</p>
                </div>
                <p className={styles.price}>{'$'}{item.Product.price}</p>
              </div>

              <p className={styles.productDescriptionName}>{'Size:'}</p>
              <CartItemSizes
                cartItemId={item.id}
                sizesSize={'small'}
              />
            </div >
            <CartItemQuantity cartItemId={item.id} />
            <FullSizeImage src={JSON.parse(item.Product.images)[0]} />
          </div>
        )}
      </div>
      <div className={styles.total}>
        <span className={styles.totalName}>{'Total'}</span>
        <span className={styles.totalValue}>{'$'}{(Math.floor((subTotal + tax) * 100)) / 100}</span>
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
