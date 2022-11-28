import React from 'react'
import { IProductPageComponent } from './ProductPageComponent.types'
import styles from './ProductPageComponent.module.css'
import { useParams } from 'react-router-dom'
import { useGetBrandsQuery } from '../../http/brandApi/brandApi'
import { useGetCategoriesQuery } from '../../http/categoryApi/categoryApi'
import { useGetProductByIdQuery } from '../../http/productApi/productApi'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import Centered from '../../components/Centered/Centered'
import ProductPageImageGallery from '../../components/ProductPageImageGallery/ProductPageImageGallery'
import ProductPageDescription from '../../components/ProductPageDescription/ProductPageDescription'

const ProductPageComponent = ({ className, ...props }: IProductPageComponent) => {
  useGetCategoriesQuery(undefined, {
    selectFromResult: () => ({})
  })
  useGetBrandsQuery(undefined, {
    selectFromResult: () => ({})
  })

  const { id } = useParams()

  const { isLoading, isSuccess } = useGetProductByIdQuery(id ?? skipToken)

  if (isLoading) {
    return <Centered>{'Loading...'}</Centered>
  }

  if (!isSuccess || id === undefined) {
    return <Centered>{'The product not found'}</Centered>
  }

  return (
    <div>
      <div
        className={styles.gridContainer}
        {...props}
      >
        <ProductPageImageGallery productId={id} />
        <ProductPageDescription productId={id} />
      </div>
    </div>
  )
}

export default ProductPageComponent
