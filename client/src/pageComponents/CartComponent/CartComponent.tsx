import React from 'react'
import { IUserComponent } from './CartComponent.types'
import styles from './CartComponent.module.css'
import Order from '../../components/Order/Order'
import { useAppSelector } from '../../hooks/redux'
import CartItemQuantity from '../../components/CartItemQuantity/CartItemQuantity'
import CartItemSizes from '../../components/CartItemSizes/CartItemSizes'
import FullSizeImage from '../../components/FullSizeImage/FullSizeImage'
import { selectAllCartItems, selectCartOverallQuantity, selectCartSubTotal, selectCartTax, selectCartTaxPercentage } from '../../http/cartApi/cartApiSelectors'

const CartComponent = ({ className, ...props }: IUserComponent) => {
  const Items = useAppSelector(selectAllCartItems)

  const subTotal = useAppSelector(selectCartSubTotal)
  const overallQuantity = useAppSelector(selectCartOverallQuantity)
  const taxPercentage = useAppSelector(selectCartTaxPercentage)
  const tax = useAppSelector(selectCartTax)

  if (Items[0] === undefined) {
    return <p>{'Your cart is empty('}</p>
  }

  return (
    <>
      <h2 className={styles.heading}>{'Cart'}</h2>
      <hr className={styles.hr} />
      {Items.map(({
        id,
        Product: {
          Brand: { name: brandName },
          Category: { name: categoryName },
          price,
          images
        }
      }) =>
        <div key={id}>
      <div className={styles.product}>
        <div className={styles.productDescription}>

          <div className={styles.descriptionContainer}>
            <h2 className={styles.brandName}>{brandName}</h2>
            <p className={styles.categoryName}>{categoryName}</p>
            <p className={styles.price}>{'$'}{price}</p>
          </div>

          <p className={styles.productDescriptionName}>{'Size:'}</p>
          <CartItemSizes
            cartItemId={id}
            sizesSize={'large'}
          />
        </div >
        <CartItemQuantity cartItemId={id} />
        <FullSizeImage src={JSON.parse(images)[0]} />
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
