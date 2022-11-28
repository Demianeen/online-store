import React, { useState } from 'react'
import styles from './ProductPageOrder.module.css'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useGetProductByIdQuery } from '../../http/productApi/productApi'
import { IProductPageOrder } from './ProductPageOrder.types'
import { parsedSize } from '../../store/reducers/types'
import Price from '../Price/Price'
import AddToCart from '../AddToCart/AddToCart'
import SizesSelect from '../SizesSelect/SizesSelect'

const ProductPageOrder = ({ productId }: IProductPageOrder) => {
  const { data: product, isLoading, isSuccess } = useGetProductByIdQuery(productId ?? skipToken)

  const [selectedSize, setSelectedSize] = useState<parsedSize>(product?.sizes[1] ?? 'XS')

  if (isLoading) {
    return null
  }

  if (!isSuccess || productId === undefined) {
    return null
  }

  return (
    <>
      <p className={styles.productDescriptionName}>{'SIZE:'}</p>
      {/* <div className={styles.sizesContainer}>
        {product.sizes.map(size =>
          <button
            onClick={() => setSelectedSize(size)}
            className={cn(styles.sizeButton, {
              [styles.selectedSizeButton]: selectedSize === size,
              [styles.outOfStockSize]: !product.isInStock
            })}
            key={size}
            disabled={!product.isInStock}
          >
            {size}
          </button>
        )}
      </div> */}
      <SizesSelect
        sizesSize={'large'}
        sizes={product.sizes}
        onSizeSelect={setSelectedSize}
        defaultSize={selectedSize ?? 'XL'}
      />

      <p className={styles.productDescriptionName}>{'PRICE:'}</p>
      <p className={styles.price}><Price price={product.price} /></p>

      {/* Id is string if page already loaded */}
      <AddToCart
        className={styles.addToCart}
        productId={productId}
        buttonSize={'large'}
        size={selectedSize}
        isInStock={product.isInStock}
      />
    </>
  )
}

export default ProductPageOrder
