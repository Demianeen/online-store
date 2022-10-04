import React from 'react'
import { IUserComponent } from './CartComponent.types'
import styles from './CartComponent.module.css'
import Order from '../../components/Order/Order'
import CartItemQuantity from '../../components/CartItemQuantity/CartItemQuantity'
import FullSizeImage from '../../components/FullSizeImage/FullSizeImage'
import CartItemSizes from '../../components/CartItemSizes/CartItemSizes'
import { useGetCartQuery } from '../../http/cartApi/cartApi'
import { useCartTotal } from '../../hooks/cart'
import { useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../utils/consts'

const CartComponent = ({ className, ...props }: IUserComponent) => {
  // FIXME: not refreshing when the state changes on cart control on the cart page
  const { user } = useAppSelector(store => store.user)
  const navigate = useNavigate()

  if (user === undefined) {
    navigate(Routes.LOGIN_ROUTE)
    return <></>
  }

  const { data, isLoading, isSuccess } = useGetCartQuery(user.CartId)
  const { subTotal, overallQuantity, taxPercentage, tax } = useCartTotal()

  // useEffect(() => {
  //   const getInitialProps = async () => {
  //     if (user !== undefined) {
  //       dispatch(fetchCart(user.id))
  //     } else {
  //       navigate(Routes.LOGIN_ROUTE)
  //     }
  //   }

  //   getInitialProps()
  // }, [])

  if (isLoading) {
    return <p>{'Loading...'}</p>
  }

  if (!isSuccess) {
    alert('Error occurred')
    return <></>
  }

  if (data.Items[0] === undefined) {
    return <p>{'Your cart is empty('}</p>
  }

  return (
    <>
      <h2 className={styles.heading}>{'Cart'}</h2>
      <hr className={styles.hr} />
      {data.Items.map(item =>
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
        <span className={styles.totalValue}>{'$'}{(Math.floor((subTotal + tax) * 100)) / 100}</span>
      </div>
      <Order className={styles.order}>{'Order'}</Order>
    </>
  )
}

export default CartComponent
