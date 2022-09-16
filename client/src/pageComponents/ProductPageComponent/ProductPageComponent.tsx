import React, { useEffect, useRef, useState } from 'react'
import { IProductPageComponent } from './ProductPageComponent.types'
import styles from './ProductPageComponent.module.css'
import cn from 'classnames'
import { useParams } from 'react-router-dom'
import ErrorPage from '../../pages/404'
import { IProduct } from '../../store/reducers/ProductSlice/types'
import { fetchOneProduct } from '../../http/productApi'
import AddToCart from '../../components/AddToCart/AddToCart'

const ProductPageComponent = ({ className, ...props }: IProductPageComponent) => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined)
  const [images, setImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>('')
  const [isError, setIsError] = useState(false)

  const sizes = useRef(['XS', 'S', 'M', 'L'])
  const [selectedSize, setSelectedSize] = useState(sizes.current[0])

  const { id } = useParams()

  useEffect(() => {
    const getInitialProps = async () => {
      if (id !== undefined) {
        const fetchedProduct = await fetchOneProduct(parseInt(id))
        if (fetchedProduct === null) return setIsError(true)

        const parsedImages = JSON.parse(fetchedProduct.images)
        setImages(parsedImages)
        setMainImage(parsedImages[0])
        setProduct(fetchedProduct)
      }
    }
    getInitialProps()
  }, [])

  if (isError) {
    return <ErrorPage />
  }

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

            {images.map(imagePath =>
              <li key={imagePath} >
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
          alt={product.Brand.name + ' ' + product.Category.name}
        />

        {/* product description block */}
        <div className={styles.productDescription}>
          <h2 className={styles.brandName}>{product.Brand.name}</h2>
          <p className={styles.categoryName}>{product.Category.name}</p>

          <p className={styles.productDescriptionName}>{'SIZE:'}</p>
          <div className={styles.sizesContainer}>
            {sizes.current.map(size =>
              <button
                onClick={() => setSelectedSize(size)}
                className={cn(styles.sizeButton, {
                  [styles.selectedSizeButton]: selectedSize === size
                })}
                key={size}
              >
                {size}
              </button>
            )}
          </div>

          <p className={styles.productDescriptionName}>{'PRICE:'}</p>
          <p className={styles.price}>{'$'}{product.price}{'.00'}</p>

          {/* Id is string if page already loaded */}
          <AddToCart
            className={styles.addToCart}
            productId={parseInt(id as string)}
            size={'large'}
          />

          <p className={styles.description}>{product.description}</p>
        </div>
      </div>
    </div>
  )
}

export default ProductPageComponent
