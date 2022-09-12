import React, { useState } from 'react'
import CreateBrand from '../components/modals/CreateBrand/CreateBrand'
import CreateProduct from '../components/modals/CreateProduct/CreateProduct'
import CreateCategory from '../components/modals/CreateCategory/CreateCategory'

export const Admin = () => {
  const [isTypeVisible, setIsTypeVisible] = useState(false)
  const [isBrandVisible, setIsBrandVisible] = useState(false)
  const [isProductVisible, setIsProductVisible] = useState(false)

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
