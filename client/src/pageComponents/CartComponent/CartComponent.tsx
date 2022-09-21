import React, { useEffect } from 'react'
import { IUserComponent } from './CartComponent.types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { useNavigate } from 'react-router-dom'
import { changeItemQuantity } from '../../http/cartApi'
import cartSlice, { fetchCart } from '../../store/reducers/CartSlice/slice'
import { Routes } from '../../utils/consts'
import styles from './CartComponent.module.css'
import cn from 'classnames'
import Order from '../../components/Order/Order'

const CartComponent = ({ className, ...props }: IUserComponent) => {
  const dispatch = useAppDispatch()
  const { setItemQuantity } = cartSlice.actions
  const { Items, itemsPrice: totalPrice, overallQuantity, taxPercentage, tax } = useAppSelector(store => store.cart)

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

  const increaseByOne = async (id: number, quantity: number) => {
    const increasedQuantity = quantity + 1

    const changedQuantity = changeItemQuantity(id, increasedQuantity)
    dispatch(setItemQuantity({ id, quantity: increasedQuantity }))

    if (await changedQuantity === null || await changedQuantity === undefined) {
      dispatch(setItemQuantity({ id, quantity }))
    }
  }

  const decreaseByOne = async (id: number, quantity: number) => {
    const decreasedQuantity = quantity - 1

    if (decreasedQuantity < 1) {
      const isDeleteConfirmed = confirm('Do you want to remove this item from cart?')

      if (isDeleteConfirmed) {
        changeItemQuantity(id, decreasedQuantity)
        if (user !== undefined) {
          dispatch(fetchCart(user.id))
        }
      }
      return
    }

    const changedQuantity = changeItemQuantity(id, decreasedQuantity)
    dispatch(setItemQuantity({ id, quantity: decreasedQuantity }))

    if (await changedQuantity === null || await changedQuantity === undefined) {
      dispatch(setItemQuantity({ id, quantity }))
      alert('Error occurred')
    }
  }

  if (Items[0] === undefined) {
    return <p>{'Your cart is empty('}</p>
  }

  return (
    <>
      <h2 className={styles.heading}>{'Cart'}</h2>
      <hr className={styles.hr} />
      {Items.map(({ id, Product, quantity }) => {
        const parsedImages: string[] = JSON.parse(Product.images)
        const imageIndex = 0
        const sizes = ['XS', 'S', 'M', 'l']
        const selectedSize = sizes[1]

        return <div key={id}>
          <div className={styles.product}>
            <div className={styles.productDescription}>
              <h3 className={styles.brandName}>{Product.Brand.name}</h3>
              <p className={styles.categoryName}>{Product.Category.name}</p>
              <p className={styles.price}>{'$' + Product.price.toString()}</p>

              <p className={styles.productDescriptionName}>{'Size:'}</p>
              <div className={styles.sizesContainer}>
                {sizes.map(size =>
                  <button
                    className={cn(styles.sizeButton, {
                      [styles.selectedSizeButton]: selectedSize === size
                    })}
                    key={size}
                  >
                    {size}
                  </button>
                )}
              </div>
            </div>
            <div className={styles.quantityContainer}>
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

            <div className={styles.imageContainer}>
              <img
                src={process.env.REACT_APP_API_URL + parsedImages[imageIndex]}
                alt={Product.Brand.name + ' ' + Product.Category.name}
                className={styles.image}
              />
            </div>
          </div>

          <hr className={styles.hr} />
        </div>
      })}
      <div className={styles.summary}>
        <span className={styles.totalCategoryName}>{'Tax ' + taxPercentage.toString() + '%: '}</span>
        <span className={styles.totalValue}>{'$' + tax.toString()}</span>

        <span className={styles.totalCategoryName}>{'Quantity: '}</span>
        <span className={styles.totalValue}>{overallQuantity}</span>

        <span className={styles.total}>{'Total: '}</span>
        <span className={styles.totalValue}>{'$' + (totalPrice + tax).toString()}</span>
      </div>
      <Order className={styles.order}>{'Order'}</Order>
    </>
  )
}

export default CartComponent
