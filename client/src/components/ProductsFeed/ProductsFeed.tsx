import React, { useEffect, useMemo, useRef } from 'react'
import { IProductFeed } from './ProductsFeed.types'
import styles from './ProductsFeed.module.css'
import cn from 'classnames'
import Product from '../Product/Product'
import { selectProductsIds } from '../../http/productApi/productApi'
import { nextPage } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { useInfiniteGetProducts } from '../../hooks/useInfiniteGetProducts'
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { selectIsValuesEnded } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'

const ProductsFeed = ({ className, ...props }: IProductFeed) => {
  const productsIds = useInfiniteGetProducts(selectProductsIds, undefined)

  const childRef = useRef<HTMLDivElement>(null)

  const isValuesEnded = useAppSelector(selectIsValuesEnded)
  const dispatch = useAppDispatch()

  const options = {
    rootMargin: '0px',
    thresholds: 0
  }

  const observer = useMemo(() =>
    new IntersectionObserver(([target]) => {
      if (target.isIntersecting) {
        dispatch(nextPage())
      }
    }, options), [])

  useEffect(() => {
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
  }, [isValuesEnded, childRef.current])

  return (
    <div
      className={cn(styles.container, className)}
      {...props}
    >
      {productsIds?.map((id) =>
        <Product key={id} productId={id}/>
      )}
      {productsIds !== undefined && <div className={styles.scrollEnd} ref={childRef} />}
    </div>
  )
}

export default ProductsFeed
