import React from 'react'
import { ICurrencySelect } from './ShopComponent.types'
import styles from './ShopComponent.module.css'
import ProductsFeed from '../../components/ProductsFeed/ProductsFeed'

const ShopComponent = ({ className, ...props }: ICurrencySelect) => {
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
