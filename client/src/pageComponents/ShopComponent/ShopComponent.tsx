import React, { useEffect } from 'react'
import { ICurrencySelect } from './ShopComponent.types'
import styles from './ShopComponent.module.css'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import Pagination from '../../components/Pagination/Pagination'
import { fetchCategories, fetchBrands, fetchProducts } from '../../http/productApi'
import productSlice from '../../store/reducers/ProductSlice/slice'
import ProductsFeed from '../../components/ProductsFeed/ProductsFeed'

const ShopComponent = ({ className, ...props }: ICurrencySelect) => {
  const dispatch = useAppDispatch()
  const { setTypes, setBrands, setProducts, setAmountOfProducts } = productSlice.actions
  const {
    selectedCategory, selectedGender, limit, page
  } =
    useAppSelector(store => store.product)

  useEffect(() => {
    const getInitialProps = async () => {
      const types = await fetchCategories()
      const brands = await fetchBrands()
      const productsAndCount = await fetchProducts(limit, page)

      dispatch(setTypes(types))
      dispatch(setBrands(brands))
      dispatch(setProducts(productsAndCount.rows))
      dispatch(setAmountOfProducts(productsAndCount.count))
    }
    getInitialProps()
  }, [])

  useEffect(() => {
    const getProducts = async () => {
      const productsAndCount = await fetchProducts(limit, page, selectedCategory?.id, selectedGender)
      dispatch(setProducts(productsAndCount.rows))
      dispatch(setAmountOfProducts(productsAndCount.count))
    }
    getProducts()
  }, [page, selectedCategory, selectedGender])

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>
        {selectedCategory?.name ?? 'Popular'}
      </h1>
      <ProductsFeed />
      <Pagination />
    </section>
  )
}

export default ShopComponent
