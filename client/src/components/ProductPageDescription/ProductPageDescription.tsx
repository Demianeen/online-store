import React from 'react'
import styles from './ProductPageDescription.module.css'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useGetProductByIdQuery } from '../../http/productApi/productApi'
import { IProductPageDescription } from './ProductPageDescription.types'
import { useAppSelector } from '../../hooks/redux'
import { selectBrandById } from '../../http/brandApi/brandApiSelectors'
import { selectCategoryById } from '../../http/categoryApi/categoryApiSelectors'
import ProductPageOrder from '../ProductPageOrder/ProductPageOrder'

const ProductPageDescription = ({ productId }: IProductPageDescription) => {
  const { data: product } = useGetProductByIdQuery(productId ?? skipToken)

  const brand = useAppSelector(state => selectBrandById(state, product?.BrandId ?? ''))
  const category = useAppSelector(state => selectCategoryById(state, product?.CategoryId ?? ''))

  return (
    <div className={styles.productDescription} >
      <h2 className={styles.brandName}>{brand?.name}</h2>
      <p className={styles.categoryName}>{category?.name}</p>

      <ProductPageOrder productId={productId}/>

      <p className={styles.description}>{product?.description}</p>
    </div>

  )
}

export default ProductPageDescription
