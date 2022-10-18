import React from 'react'
import { IProduct } from './Product.types'
import styles from './Product.module.css'
import cn from 'classnames'
import { Routes } from '../../utils/consts'
import AddToCart from '../AddToCart/AddToCart'
import { useNavigate } from 'react-router-dom'
import { useConvert } from '../../hooks/currency'

const Product = ({ product, className, ...props }: IProduct) => {
  const { id, Brand, Category, price, images, sizes, isInStock } = product
  const navigate = useNavigate()

  const [convert, { symbol }] = useConvert()
  const convertedPrice = convert(price)

  const parsedImages: string[] = JSON.parse(images)
  return (
    <div
      key={id}
      onClick={() => navigate(`${Routes.PRODUCT_ROUTE}/${id}`)}
      className={cn(styles.product, className)}
      {...props}
    >
      {!isInStock && <div className={styles.outOfStockOverlay}>
        <span className={styles.overlayText}>{'Out of stock'}</span>
      </div>}
      <img
        src={process.env.REACT_APP_API_URL + parsedImages[0]}
        alt={Brand.name + ' ' + Category.name}
        className={styles.image}
      />
      <span className={styles.name}>{Brand.name + ' ' + Category.name}</span>
      <span className={styles.price}>{symbol}{convertedPrice}{'.00'}</span>
      {isInStock && <AddToCart
        className={styles.addToCartButton}
        productId={id}
        buttonSize={'small'}
        size={JSON.parse(sizes)[0]}
        isInStock={isInStock}
      />}
    </div>

  )
}

export default Product
