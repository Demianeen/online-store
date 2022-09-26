import React, { useEffect } from 'react'
import { IUserComponent } from './CartComponent.types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { fetchCart } from '../../store/reducers/CartSlice/slice'
import { Routes } from '../../utils/consts'
import styles from './CartComponent.module.css'
import Order from '../../components/Order/Order'
import CartItemQuantity from '../../components/CartItemQuantity/CartItemQuantity'
import FullSizeImage from '../../components/FullSizeImage/FullSizeImage'
import CartItemSizes from '../../components/CartItemSizes/CartItemSizes'

const CartComponent = ({ className, ...props }: IUserComponent) => {
  const dispatch = useAppDispatch()
  // FIXME: not refreshing when the state changes on cart control on the cart page
  const { Items, itemsPrice, overallQuantity, taxPercentage, tax } = useAppSelector(store => store.cart)

  const { user } = useAppSelector(store => store.user)

  const navigate = useNavigate()

  useEffect(() => {
    const getInitialProps = async () => {
      if (user !== undefined) {
        dispatch(fetchCart(user.id))
      } else {
        navigate(Routes.LOGIN_ROUTE)
      }
    }

    getInitialProps()
  }, [])

  if (Items[0] === undefined) {
    return <p>{'Your cart is empty('}</p>
  }

  return (
    <>
      <h2 className={styles.heading}>{'Cart'}</h2>
      <hr className={styles.hr} />
      {Items.map(item =>
        <div key={item.id}>
          <div className={styles.product}>
            <div className={styles.productDescription}>

              <div className={styles.descriptionContainer}>
                <h2 className={styles.brandName}>{item.Product.Brand.name}</h2>
                <p className={styles.categoryName}>{item.Product.Category.name}</p>
                <p className={styles.price}>{'$'}{item.Product.price}</p>
              </div>

              <p className={styles.productDescriptionName}>{'Size:'}</p>
              <CartItemSizes
                cartItem={item}
                sizesSize={'large'}
              />
            </div >
            <CartItemQuantity cartItem={item} />
            <FullSizeImage src={JSON.parse(item.Product.images)[0]} />
          </div>

          <hr className={styles.hr} />
        </div>

      )}
      <div className={styles.summary}>
        <span className={styles.totalCategoryName}>{'Tax ' + taxPercentage.toString() + '%: '}</span>
        <span className={styles.totalValue}>{'$' + tax.toString()}</span>

        <span className={styles.totalCategoryName}>{'Quantity: '}</span>
        <span className={styles.totalValue}>{overallQuantity}</span>

        <span className={styles.total}>{'Total: '}</span>
        <span className={styles.totalValue}>{'$'}{(Math.floor((itemsPrice + tax) * 100)) / 100}</span>
      </div>
      <Order className={styles.order}>{'Order'}</Order>
    </>
  )
}

export default CartComponent
