import React from 'react'
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
import { useGetCartQuery } from '../../../http/cartApi/cartApi'
import { useCartTotal } from '../../../hooks/cart'
import { useAppSelector } from '../../../hooks/redux'

const CartControl = ({ isVisible, setIsVisible, ...props }: ICartControl) => {
  const { user } = useAppSelector(store => store.user)
  const navigate = useNavigate()

  if (user === undefined) {
    navigate(Routes.LOGIN_ROUTE)
    return <></>
  }

  const { data, isLoading, isError, error } = useGetCartQuery(user.CartId)
  const { subTotal, overallQuantity, tax } = useCartTotal()

  if (!isVisible) {
    return <></>
  }

  if (isLoading) {
    return <SideModal
      className={styles.informationModal}
    >
      {'Loading...'}
    </SideModal>
  }

  if (isError) {
    console.log(JSON.stringify(error))
    return <SideModal
      className={styles.informationModal}
    >
      {JSON.stringify(error)}
    </SideModal>
  }

  if (data?.Items[0] === undefined && isVisible) {
    setIsVisible(false)
    setTimeout(() => {
      alert('Add items to the cart first.')
    }, 50)
    return <></>
  }

  return (
    <SideModal className={styles.sideModal} {...props}>
      <p className={styles.heading}><b className={styles.bold}>{'My bag'}</b>{', '}{overallQuantity}{' items'}</p>
      <div className={styles.scrollContainer}>
        {data?.Items.map((item) =>
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
                cartItem={item}
                sizesSize={'small'}
              />
            </div >
            <CartItemQuantity cartItem={item} />
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
