import React, { useEffect, useState } from 'react'
import styles from './ProductPageImageGallery.module.css'
import { skipToken } from '@reduxjs/toolkit/dist/query'
import { useGetProductByIdQuery } from '../../http/productApi/productApi'
import { IProductPageImageGallery } from './ProductPageImageGallery.types'

const ProductPageImageGallery = ({ productId }: IProductPageImageGallery) => {
  const { data: product } = useGetProductByIdQuery(productId ?? skipToken)

  const [mainImage, setMainImage] = useState<string>(product?.images[0] ?? '')

  useEffect(() => {
    if (product !== undefined) {
      setMainImage(product.images[0])
    }
  }, [product?.images[0]])

  return (
    <>
      <section className={styles.imageGalleryContainer} >
        <ol className={styles.imageGallery}>

          {product?.images.map((imagePath) =>
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
        <img
          className={styles.selectedImage}
          src={process.env.REACT_APP_API_URL + mainImage}
          alt={'Product image'}
        />
    </>

  )
}

export default ProductPageImageGallery
