import React from 'react'
import { IProductFeed } from './ProductsFeed.types'
import styles from './ProductsFeed.module.css'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'
import { IProductWithBrandAndCategory } from '../../store/reducers/ProductSlice/types'
import Product from '../Product/Product'

const ProductsFeed = ({ className, ...props }: IProductFeed) => {
  const { products } = useAppSelector(store => store.product)

  const inStockProducts: IProductWithBrandAndCategory[] = []
  const outOfStockProducts: IProductWithBrandAndCategory[] = []

  products.forEach(product => {
    if (product.isInStock) {
      inStockProducts.push(product)
      return
    }
    outOfStockProducts.push(product)
  })

  return (
    <div className={cn(styles.container, className)} {...props}>
      {inStockProducts.map((product) =>
        <Product key={product.id} product={product}/>
      )}
      {outOfStockProducts.map((product) =>
        <Product key={product.id} product={product} />
      )}
    </div>)
}

export default ProductsFeed
