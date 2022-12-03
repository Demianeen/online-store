import React, { useEffect, useRef } from 'react'
import { IProductFeed } from './ProductsFeed.types'
import styles from './ProductsFeed.module.css'
import cn from 'classnames'
import Product from '../Product/Product'
import { nextPage } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { selectIsValuesEnded } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'
import { selectProductsIds } from '../../store/reducers/productSlice/productSliceSelectors'
import Centered from '../Centered/Centered'

const ProductsFeed = ({ className, ...props }: IProductFeed) => {
  const productsIds = useAppSelector(selectProductsIds)

  const childRef = useRef<HTMLDivElement>(null)

  const isValuesEnded = useAppSelector(selectIsValuesEnded)
  const dispatch = useAppDispatch()

  useEffect(() => {
    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }

    const observer =
      new IntersectionObserver(([target]) => {
        if (target.isIntersecting) {
          dispatch(nextPage())
        }
      }, options)

    if (!isValuesEnded) {
      if (childRef.current !== null) {
        observer.observe(childRef.current)
      }

      return () => {
        if (childRef.current !== null) {
          observer.unobserve(childRef.current)
        }
      }
    }
  }, [isValuesEnded, childRef, productsIds.length !== 0])

  return (
    <div
      className={cn(styles.container, className)}
      {...props}
    >
      {productsIds?.map((id) =>
        <Product key={id} productId={id}/>
      )}
      {productsIds.length !== 0
        ? <div className={styles.scrollEnd} ref={childRef} />
        // We can see footer while page is loading for a short period of time if we don't set this
        : <Centered className={styles.loadingFooterBlocker}>{'Loading...'}</Centered>
      }
    </div>
  )
}

export default ProductsFeed
