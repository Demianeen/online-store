import React, { useState } from 'react'
import styles from './CartItem.module.css'
import cn from 'classnames'
import { parsedSize } from '../../store/reducers/types'
import { ICartItemProps } from './CartItem.types'
import { Routes } from '../../utils/consts'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { changeItemQuantity, changeItemSelectedSize } from '../../http/cartApi'
import cartSlice, { fetchCart } from '../../store/reducers/CartSlice/slice'
import { useNavigate } from 'react-router-dom'

const Product = ({ cartItem, className, ...props }: ICartItemProps) => {
  const dispatch = useAppDispatch()
  const { setItemQuantity } = cartSlice.actions
  const { user } = useAppSelector(store => store.user)

  const navigate = useNavigate()

  const { id, Product, quantity, size } = cartItem

  const [selectedSize, setSelectedSize] = useState(size)

  const sizes: parsedSize[] = JSON.parse(Product.sizes)

  const parsedImages: string[] = JSON.parse(Product.images)
  const imageIndex = 0

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

  const selectSize = async (newSize: parsedSize) => {
    if (user === undefined) return navigate(Routes.LOGIN_ROUTE)
    await changeItemSelectedSize(user.CartId, newSize)
  }

  return (
    <div>
      <div className={cn(styles.productDescription, className)} {...props}>

      <div className={styles.descriptionContainer}>
        <div className={styles.descriptionHeadingContainer}>
          <p className={styles.descriptionHeading}>{Product.Brand.name}</p>
          <p className={styles.descriptionHeading}>{Product.Category.name}</p>
        </div>
          <p className={styles.price}>{'$'}{Product.price}</p>
      </div>

      <p className={styles.productDescriptionName}>{'Size:'}</p>
      <div className={styles.sizesContainer}>
        {sizes.map((size) =>
          <button
            className={cn(styles.sizeButton, {
              [styles.selectedSizeButton]: size === selectedSize
            })}
            key={size}
            onClick={() => { setSelectedSize(size); selectSize(size) }}
          >
            {size}
          </button>
        )}
      </div>
    </div >
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
    </div >
  )
}

export default Product
