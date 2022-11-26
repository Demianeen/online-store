import React from 'react'
import { ICurrencySelect } from './ShopComponent.types'
import styles from './ShopComponent.module.css'
import ProductsFeed from '../../components/ProductsFeed/ProductsFeed'
import { useGetBrandsQuery } from '../../http/brandApi/brandApi'
import { useGetCategoriesQuery } from '../../http/categoryApi/categoryApi'
import InitializeGetProductsQuery from '../../components/InitializeGetProductsQuery/InitializeGetProductsQuery'

const ShopComponent = ({ className, ...props }: ICurrencySelect) => {
  useGetCategoriesQuery(undefined, {
    selectFromResult: () => ({})
  })
  useGetBrandsQuery(undefined, {
    selectFromResult: () => ({})
  })

  return (
    <section>
      <h1 className={styles.heading}>
        {'Popular'}
      </h1>
      <ProductsFeed />
      <InitializeGetProductsQuery />
    </section>
  )
}

export default ShopComponent
