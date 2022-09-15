import React from 'react'
import { ProductFeed } from './ProductsFeed.types'
import styles from './ProductsFeed.module.css'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'
import { Routes } from '../../utils/consts'
import AddToCart from '../AddToCart/AddToCart'
import { useNavigate } from 'react-router-dom'

const ProductsFeed = ({ className, ...props }: ProductFeed) => {
  const { products } = useAppSelector(store => store.product)

  const navigate = useNavigate()

  return (
    <div className={cn(styles.container, className)} {...props}>
      {products.map(({ id, Brand, Category, price, images }) => {
        const parsedImages: string[] = JSON.parse(images)

        return (<div
          key={id}
          onClick={() => navigate(`${Routes.PRODUCT_ROUTE}/${id}`)}
          className={cn(styles.product, className)}
          {...props}
        >
          <img
            src={process.env.REACT_APP_API_URL + parsedImages[0]}
            alt={Brand.name + ' ' + Category.name}
            className={styles.image}
          />
          <span className={styles.name}>{Brand.name + ' ' + Category.name}</span>
          <span className={styles.price}>{'$'}{price}</span>
          <AddToCart className={styles.addToCartButton} productId={id} />
        </div>
        )
      })}
    </div>)
}

export default ProductsFeed
