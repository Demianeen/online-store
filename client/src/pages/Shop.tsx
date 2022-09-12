import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from '../components/Pagination/Pagination'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { fetchBrands, fetchProducts, fetchCategories } from '../http/productApi'
import productSlice from '../store/reducers/ProductSlice/slice'
import { Routes } from '../utils/consts'

const Shop = () => {
  const navigate = useNavigate()

  const dispatch = useAppDispatch()
  const { setTypes, setBrands, setDevices, setAmountOfDevices, selectCategory, selectBrand } = productSlice.actions
  const { products, categories, brands, selectedCategoryId, selectedBrandId, limit, page } =
    useAppSelector(store => store.product)

  useEffect(() => {
    const getInitialProps = async () => {
      const types = await fetchCategories()
      const brands = await fetchBrands()
      const productsAndCount = await fetchProducts(limit, page)

      dispatch(setTypes(types))
      dispatch(setBrands(brands))
      dispatch(setDevices(productsAndCount.rows))
      dispatch(setAmountOfDevices(productsAndCount.count))
    }
    getInitialProps()
  }, [])

  useEffect(() => {
    const getDevices = async () => {
      const devicesAndCount = await fetchProducts(limit, page, selectedCategoryId, selectedBrandId)
      dispatch(setDevices(devicesAndCount.rows))
      dispatch(setAmountOfDevices(devicesAndCount.count))
    }
    getDevices()
  }, [page, selectedBrandId, selectedCategoryId])

  const chooseCategory = (id: number) => {
    if (selectedCategoryId === id) {
      return dispatch(selectCategory(undefined))
    }
    dispatch(selectCategory(id))
  }
  const chooseBrand = (id: number) => {
    if (selectedBrandId === id) {
      return dispatch(selectBrand(undefined))
    }
    dispatch(selectBrand(id))
  }

  return (
    <section style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      width: '100%'
    }}>
      {/* Categories bar */}
      <ul>
        {categories.map(({ id, name }) =>
          <li
            onClick={() => chooseCategory(id)}
            key={id}
            style={selectedCategoryId === id
              ? {
                  background: 'black',
                  color: 'white',
                  cursor: 'pointer'
                }
              : {
                  cursor: 'pointer'
                }
            }
          >{name}</li>
        )}
      </ul>
      <div>
        {/* Brands bar */}
        <div style={{ flexShrink: '2' }}>
          <ul style={{
            display: 'flex',
            flexDirection: 'row',
            listStyle: 'none'
          }}>
            {brands.map(({ id, name }) =>
              <li
                onClick={() => chooseBrand(id)}
                key={id}
                style={{
                  background: selectedBrandId === id ? 'black' : 'white',
                  color: selectedBrandId === id ? 'white' : 'black',
                  cursor: 'pointer',
                  padding: 15
                }}
              >{name}</li>
            )}
          </ul>
        </div>

        {/* Products bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: 25,
          padding: '0 50px 50px 50px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {products.map(({ id, price, Brand, Category, images }) => {
            const parsedImages: string[] = JSON.parse(images)
            return <div
              onClick={() => navigate(`${Routes.DEVICE_ROUTE}/${id}`)}
              key={id}
              style={{
                cursor: 'pointer',
                margin: 15,
                padding: 15,
                border: '2px solid black',
                width: '100%',
                boxSizing: 'border-box'
              }}
            >
              <img
                src={process.env.REACT_APP_API_URL + parsedImages[0]}
                alt={Brand.name + ' ' + Category.name }
                style={{ width: '100%' }}
              />
              <p>{Brand.name + ' ' + Category.name}</p>
              <p>{price}{'$'}</p>
            </div>
          })}
        </div>
      </div>
      <Pagination />
    </section>
  )
}

export default Shop
