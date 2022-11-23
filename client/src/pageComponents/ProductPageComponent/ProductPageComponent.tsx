import React, { useEffect, useState } from 'react'
import { IProductPageComponent } from './ProductPageComponent.types'
import styles from './ProductPageComponent.module.css'
import cn from 'classnames'
import { useParams } from 'react-router-dom'
import AddToCart from '../../components/AddToCart/AddToCart'
import { parsedSize } from '../../store/reducers/types'
import { useConvert } from '../../hooks/currency'
import { useAppSelector } from '../../hooks/redux'
import { selectBrandById } from '../../http/brandApi/brandApiSelectors'
import { selectCategoryById } from '../../http/categoryApi/categoryApiSelectors'
import { selectProductById } from '../../http/productApi/productApi'
import { useInfiniteGetProducts } from '../../hooks/useInfiniteGetProducts'

const ProductPageComponent = ({ className, ...props }: IProductPageComponent) => {
  const { id } = useParams()

  const product = useInfiniteGetProducts(selectProductById, id ?? '')
  const brand = useAppSelector(state => selectBrandById(state, product?.BrandId ?? ''))
  const category = useAppSelector(state => selectCategoryById(state, product?.CategoryId ?? ''))

  const title = `${brand?.name ?? ''} ${category?.name ?? ''}`

  const [mainImage, setMainImage] = useState<string>(product?.images[0] ?? '')

  const [selectedSize, setSelectedSize] = useState<parsedSize>(product?.sizes[0] ?? 'XS')

  const [convert, { symbol }] = useConvert()

  useEffect(() => {
    if (product !== undefined) {
      setMainImage(product.images[0])
    }
  }, [product?.images[0]])

  if (product === undefined) {
    return <p>{'Loading...'}</p>
  }

  return (
    <div>
      <div
        className={styles.gridContainer}
        {...props}
      >
        {/* images gallery block */}
        <section className={styles.imageGalleryContainer}>
          <ol className={styles.imageGallery}>

            {product.images.map((imagePath) =>
              <li key={imagePath} className={styles.imageGalleryItem}>
                {/* image gallery and gallery image are different names */}
                <div className={styles.galleryImageContainer}>
                  <button
                    onClick={() => setMainImage(imagePath)}
                    className={styles.galleryImageButton}
                  >
                    <img
                      className={styles.galleryImage}
                      src={process.env.REACT_APP_API_URL + imagePath} alt={'Image slider'}
                    />
                  </button>
                </div>
              </li>
            )}

          </ol>
        </section>

        {/* selected image block */}
        <img
          className={styles.selectedImage}
          src={process.env.REACT_APP_API_URL + mainImage}
          alt={title}
        />

        {/* product description block */}
        <div className={styles.productDescription}>
          <h2 className={styles.brandName}>{brand?.name}</h2>
          <p className={styles.categoryName}>{category?.name}</p>

          <p className={styles.productDescriptionName}>{'SIZE:'}</p>
          <div className={styles.sizesContainer}>
            {/* TODO: Remake as SizesSize component */}
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
          </div>

          <p className={styles.productDescriptionName}>{'PRICE:'}</p>
          <p className={styles.price}>{symbol}{convert(product.price)}{'.00'}</p>

          {/* Id is string if page already loaded */}
          <AddToCart
            className={styles.addToCart}
            productId={parseInt(id as string)}
            buttonSize={'large'}
            size={selectedSize}
            isInStock={product.isInStock}
          />

          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPageComponent
