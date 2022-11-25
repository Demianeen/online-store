import React from 'react'
import { IProduct } from './Product.types'
import styles from './Product.module.css'
import cn from 'classnames'
import { Routes } from '../../utils/consts'
import AddToCart from '../AddToCart/AddToCart'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux'
import { selectCategoryById } from '../../http/categoryApi/categoryApiSelectors'
import { selectBrandById } from '../../http/brandApi/brandApiSelectors'
import { selectProductById } from '../../store/reducers/productSlice/productSliceSelectors'
import Price from '../Price/Price'

const Product = ({ productId, className, ...props }: IProduct) => {
  const product = useAppSelector(state => selectProductById(state, productId))
  const brand = useAppSelector(state => selectBrandById(state, product?.BrandId ?? ''))
  const category = useAppSelector(state => selectCategoryById(state, product?.CategoryId ?? ''))
  const imageName = `${brand?.name ?? ''} ${category?.name ?? ''}`

  const navigate = useNavigate()

  if (product === undefined) {
    return <></>
  }

  return (
    <div
      onClick={() => navigate(`${Routes.PRODUCT_ROUTE}/${product.id}`)}
      className={cn(styles.product, className)}
      {...props}
    >
      {!product.isInStock && <div className={styles.outOfStockOverlay}>
        <span className={styles.overlayText}>{'Out of stock'}</span>
      </div>}
      <img
        src={process.env.REACT_APP_API_URL + product.images[0]}
        alt={imageName}
        className={styles.image}
      />
      <span className={styles.name}>{imageName}</span>
      <span className={styles.price}><Price price={product.price} /></span>
      {product.isInStock && <AddToCart
        className={styles.addToCartButton}
        productId={product.id}
        buttonSize={'small'}
        size={product.sizes[0]}
        isInStock={product.isInStock}
      />}
    </div>

  )
}

export default Product
