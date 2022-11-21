import React from 'react'
import { IProductFeed } from './ProductsFeed.types'
import styles from './ProductsFeed.module.css'
import cn from 'classnames'
import { useAppSelector } from '../../hooks/redux'
import Product from '../Product/Product'
import { useGetProductsQuery, selectProductsIds } from '../../http/productApi/productApi'

const ProductsFeed = ({ className, ...props }: IProductFeed) => {
  const productParams = useAppSelector(state => state.productParams)
  const { productsIds } = useGetProductsQuery(productParams, {
    selectFromResult: ({ data }) => ({
      productsIds: (data !== undefined) ? selectProductsIds(data) : []
    })
  })

  return (
    <div className={cn(styles.container, className)} {...props}>
      {productsIds.map((id) =>
        <Product key={id} productId={id}/>
      )}
    </div>)
}

export default ProductsFeed
