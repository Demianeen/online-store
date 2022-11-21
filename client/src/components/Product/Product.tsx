import React from 'react'
import { IProduct } from './Product.types'
import styles from './Product.module.css'
import cn from 'classnames'
import { Routes } from '../../utils/consts'
import AddToCart from '../AddToCart/AddToCart'
import { useNavigate } from 'react-router-dom'
import { useConvert } from '../../hooks/currency'
import { selectProductById, useGetProductsQuery } from '../../http/productApi/productApi'
import { useAppSelector } from '../../hooks/redux'
import { selectCategoryById } from '../../http/categoryApi/categoryApiSelectors'
import { selectBrandById } from '../../http/brandApi/brandApiSelectors'

const Product = ({ productId, className, ...props }: IProduct) => {
  const productParams = useAppSelector(state => state.productParams)
  const { product } = useGetProductsQuery(productParams, {
    selectFromResult: ({ data }) => ({
      product: (data !== undefined) ? selectProductById(data, productId) : undefined
    })
  })
  const brand = useAppSelector(state => selectBrandById(state, product?.BrandId ?? ''))
  const category = useAppSelector(state => selectCategoryById(state, product?.CategoryId ?? ''))
  const imageName = `${brand?.name ?? ''} ${category?.name ?? ''}`

  const navigate = useNavigate()

  const [convert, { symbol }] = useConvert()

  if (product === undefined) {
    return <></>
  }

  const convertedPrice = convert(product.price)

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
      <span className={styles.price}>{symbol}{convertedPrice}{'.00'}</span>
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
