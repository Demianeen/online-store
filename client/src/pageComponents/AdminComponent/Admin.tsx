import React from 'react'
// import CreateBrand from '../../components/modals/CreateBrand/CreateBrand'
// import CreateCategory from '../../components/modals/CreateCategory/CreateCategory'

const AdminComponent = () => {
  // const [isTypeVisible, setIsTypeVisible] = useState(false)
  // const [isBrandVisible, setIsBrandVisible] = useState(false)

  // const dispatch = useAppDispatch()
  // const {
  //   selectedCategory, selectedGender, limit, page
  // } =
  //   useAppSelector(store => store.productParams)

  // useEffect(() => {
  //   const getInitialProps = async () => {
  //     const types = await fetchCategories()
  //     const brands = await fetchBrands()
  //     const productsAndCount = await fetchProducts(limit, page)

  //     dispatch(setTypes(types))
  //     dispatch(setBrands(brands))
  //     dispatch(setProducts(productsAndCount.rows))
  //     dispatch(setAmountOfProducts(productsAndCount.count))
  //   }
  //   getInitialProps()
  // }, [])

  // useEffect(() => {
  //   const getProducts = async () => {
  //     const productsAndCount = await fetchProducts(limit, page, selectedCategory?.id, selectedGender)
  //     dispatch(setProducts(productsAndCount.rows))
  //     dispatch(setAmountOfProducts(productsAndCount.count))
  //   }
  //   getProducts()
  // }, [page, selectedCategory, selectedGender])

  return (
    <div>
      {/* <button onClick={() => setIsTypeVisible(true)}>{'Add category'}</button> */}
      {/* <CreateCategory hide={() => setIsTypeVisible(false)} isVisible={isTypeVisible} /> */}

      {/* <button onClick={() => setIsBrandVisible(true)}>{'Add brand'}</button> */}
      {/* <CreateBrand hide={() => setIsTypeVisible(false)} isVisible={isBrandVisible} /> */}
    </div>
  )
}

export default AdminComponent
