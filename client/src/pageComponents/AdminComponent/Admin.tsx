import React, { useEffect, useState } from 'react'
import { IUserComponent } from './Admin.types'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { fetchCategories, fetchBrands, fetchProducts } from '../../http/productApi'
import productSlice from '../../store/reducers/ProductSlice/slice'
import CreateBrand from '../../components/modals/CreateBrand/CreateBrand'
import CreateCategory from '../../components/modals/CreateCategory/CreateCategory'
import CreateProduct from '../../components/modals/CreateProduct/CreateProduct'

const UserComponent = ({ className, ...props }: IUserComponent) => {
  const [isTypeVisible, setIsTypeVisible] = useState(false)
  const [isBrandVisible, setIsBrandVisible] = useState(false)
  const [isProductVisible, setIsProductVisible] = useState(false)

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
    <div>
      <button onClick={() => setIsTypeVisible(true)}>{'Add category'}</button>
      <CreateCategory hide={() => setIsTypeVisible(false)} isVisible={isTypeVisible} />

      <button onClick={() => setIsBrandVisible(true)}>{'Add brand'}</button>
      <CreateBrand hide={() => setIsTypeVisible(false)} isVisible={isBrandVisible} />

      <button onClick={() => setIsProductVisible(true)}>{'Add product'}</button>
      <CreateProduct hide={() => setIsProductVisible(false)} isVisible={isProductVisible} />
    </div>
  )
}

export default UserComponent
