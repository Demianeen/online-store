import React from 'react'
import { ICurrencySelect } from './ShopComponent.types'
import styles from './ShopComponent.module.css'
import ProductsFeed from '../../components/ProductsFeed/ProductsFeed'
import { useGetBrandsQuery } from '../../http/brandApi/brandApi'
import { useGetCategoriesQuery } from '../../http/categoryApi/categoryApi'

const ShopComponent = ({ className, ...props }: ICurrencySelect) => {
  useGetCategoriesQuery(undefined)
  useGetBrandsQuery(undefined)

  return (
    <section>
      <h1 className={styles.heading}>
        {'Popular'}
      </h1>
      <ProductsFeed />
    </section>
  )
}

export default ShopComponent
