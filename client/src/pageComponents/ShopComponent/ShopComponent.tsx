import React from 'react'
import { ICurrencySelect } from './ShopComponent.types'
import styles from './ShopComponent.module.css'
import Pagination from '../../components/Pagination/Pagination'
import ProductsFeed from '../../components/ProductsFeed/ProductsFeed'

const ShopComponent = ({ className, ...props }: ICurrencySelect) => {
  // const selectedBrandId = useAppSelector(selectSelectedBrandId)
  // const selectedCategoryId = useAppSelector(selectSelectedCategoryId)

  // const isCustomOptions = [selectedBrandId, selectedCategoryId].every((el) => el !== undefined)

  return (
    <section>
      <h1 className={styles.heading}>
        {'Popular'}
      </h1>
      <ProductsFeed />
      <Pagination />
    </section>
  )
}

export default ShopComponent
