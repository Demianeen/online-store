import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchOneProduct } from '../http/productApi'
import { IProduct } from '../store/reducers/ProductSlice/types'
import ErrorPage from './404'

const DevicePage = () => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined)
  const [images, setImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>('')
  const [isError, setIsError] = useState(false)

  // const desc = []
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
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 3fr 6fr'
      }}>
        <section style={{ width: '10vw' }}>
          <ol style={{ listStyle: 'none', width: '10vw', margin: '0', padding: '0' }}>
            {images.map(image =>
              // TODO: implement semantic checker library
              <li key={image} >
                <div style={{ overflow: 'hidden' }}>
                  <button
                    style={{ all: 'unset', cursor: 'pointer' }}
                    onClick={() => setMainImage(image)}
                  >
                    <img
                      style={{
                        objectFit: 'contain',
                        objectPosition: 'center',
                        height: '10vw'
                      }}
                      src={process.env.REACT_APP_API_URL + image} alt={'Image slider'}
                    />
                  </button>
                </div>
              </li>
            )}
          </ol>
        </section>
        <img
          src={process.env.REACT_APP_API_URL + mainImage}
          alt={product.Brand.name + ' ' + product.Category.name}
        />
        <div>
          <h2>{product.Brand.name}</h2>
          <p>{product.Category.name}</p>
          <p>{product.price}{'$'}</p>
          <button>{'Add to Cart'}</button>
        </div>
      </div>
    </div>
  )
}

export default DevicePage
