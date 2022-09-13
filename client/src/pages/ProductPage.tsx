import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'
import { addItem } from '../http/cartApi'
import { fetchOneProduct } from '../http/productApi'
import { IProduct } from '../store/reducers/ProductSlice/types'
import { Routes } from '../utils/consts'
import ErrorPage from './404'

const DevicePage = () => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined)
  const [images, setImages] = useState<string[]>([])
  const [mainImage, setMainImage] = useState<string>('')
  const [isError, setIsError] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  const { user } = useAppSelector(store => store.user)

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

  const addCartItem = async () => {
    try {
      if (user !== undefined) {
        await addItem({ ProductId: product.id, CartId: user.CartId })
      } else {
        navigate(Routes.LOGIN_ROUTE)
      }
    } catch (error) {
      alert('You have already added this product to your cart.')
    }
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
          <p style={{ whiteSpace: 'pre-line' }}>{product.description}</p>
          <button onClick={async () => await addCartItem()}>{'Add to Cart'}</button>
        </div>
      </div>
    </div>
  )
}

export default DevicePage
