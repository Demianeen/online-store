import React from 'react'
import styles from './ShopComponent.module.css'
import ProductsFeed from '../../components/ProductsFeed/ProductsFeed'
import { useGetBrandsQuery } from '../../http/brandApi/brandApi'
import { useGetCategoriesQuery } from '../../http/categoryApi/categoryApi'
import InitializeGetProductsQuery from '../../components/InitializeGetProductsQuery/InitializeGetProductsQuery'
import { useGetProductsQuery } from '../../http/productApi/productApi'
import Centered from '../../components/Centered/Centered'
import { store } from '../../store/store'
import { useAppSelector } from '../../hooks/redux'
import { selectProductGender } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'

const ShopComponent = () => {
  useGetCategoriesQuery(undefined, {
    selectFromResult: () => ({})
  })
  useGetBrandsQuery(undefined, {
    selectFromResult: () => ({})
  })

  // we just need to get params once at the start, not every time they changing
  const params = store.getState().productParams.params
  const { isLoading } = useGetProductsQuery(params, {
    selectFromResult: (data) => ({
      isLoading: data.isLoading
    })
  })
  const gender = useAppSelector(selectProductGender)

  if (isLoading) {
    return <Centered>{'Loading...'}</Centered>
  }

  return (
    <section>
      <h1 className={styles.heading}>
        {gender}
      </h1>
      <ProductsFeed />
      <InitializeGetProductsQuery />
    </section>
  )
}

export default ShopComponent
