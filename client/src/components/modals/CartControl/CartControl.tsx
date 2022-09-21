import React, { useEffect } from 'react'
import SideModal from '../SideModal/SideModal'
import { ICartControl } from './CartControl.types'
import styles from './CartControl.module.css'
import cn from 'classnames'
import { useNavigate } from 'react-router-dom'
import { Routes } from '../../../utils/consts'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { changeItemQuantity } from '../../../http/cartApi'
import cartSlice, { fetchCart } from '../../../store/reducers/CartSlice/slice'
import Button from '../../Button/Button'
import Order from '../../Order/Order'

const CartControl = ({ isVisible, setIsVisible, ...props }: ICartControl) => {
  const dispatch = useAppDispatch()
  const { setItemQuantity } = cartSlice.actions
  const { Items, itemsPrice, overallQuantity, tax } = useAppSelector(store => store.cart)

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

  if (Items[0] === undefined && isVisible) {
    setIsVisible(false)
    setTimeout(() => {
      alert('Add items to the cart first.')
    }, 50)
    return <></>
  }

  return (
    <SideModal isVisible={isVisible} className={styles.sideModal} {...props}>
      <p className={styles.heading}><b className={styles.bold}>{'My bag'}</b>{', '}{overallQuantity}{' items'}</p>
      <div className={styles.scrollContainer}>
        {Items.map(({ id, Product, quantity }) => {
          const parsedImages: string[] = JSON.parse(Product.images)
          const imageIndex = 0
          const sizes = ['XS', 'S', 'M', 'l']
          const selectedSize = sizes[1]

          return <div key={id} className={styles.product}>
            <div className={styles.productDescription}>

              <div className={styles.descriptionContainer}>
                <div className={styles.descriptionHeadingContainer}>
                  <p className={styles.descriptionHeading}>{Product.Brand.name}</p>
                  <p className={styles.descriptionHeading}>{Product.Category.name}</p>
                </div>
                <p className={styles.price}>{'$' + Product.price.toString()}</p>
              </div>

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
        })}
      </div>
      <div className={styles.total}>
        <span className={styles.totalName}>{'Total'}</span>
        <span className={styles.totalValue}>{'$'}{(Math.floor((itemsPrice + tax) * 100)) / 100}</span>
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
