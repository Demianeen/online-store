import React, { createRef } from 'react'
import { IProductsFeed } from './ProductsFeed.types'
import styles from './ProductsFeed.module.css'
import cn from 'classnames'
import Product from '../Product/Product'
import { nextPage } from '../../store/reducers/productParamsSlice/productParamsSliceActions'
import { selectIsValuesEnded } from '../../store/reducers/productParamsSlice/productParamsSliceSelectors'
import { selectProductsIds } from '../../store/reducers/productSlice/productSliceSelectors'
import Centered from '../Centered/Centered'
import { RootState } from '../../store/store'
import { connect, ConnectedProps } from 'react-redux'
import { Dispatch } from '@reduxjs/toolkit'

const mapStateToProps = (state: RootState) => ({
  productsIds: selectProductsIds(state),
  isValuesEnded: selectIsValuesEnded(state)
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  nextPage: () => dispatch(nextPage())
})

const connector =
  connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

class ProductsFeed extends React.Component<IProductsFeed & PropsFromRedux> {
  childRef = createRef<HTMLDivElement>()

  componentDidMount (): void {
    const { isValuesEnded, nextPage } = this.props

    const options: IntersectionObserverInit = {
      root: null,
      rootMargin: '0px',
      threshold: 0
    }

    const observer =
      new IntersectionObserver(([target]) => {
        if (target.isIntersecting) {
          nextPage()
        }
      }, options)

    if (!isValuesEnded) {
      if (this.childRef.current !== null) {
        observer.observe(this.childRef.current)
      }
    }
  }

  componentDidUpdate (prevProps: ProductsFeed['props'], prevState: ProductsFeed) {
    const { isValuesEnded, productsIds, nextPage } = this.props

    if (isValuesEnded !== prevProps.isValuesEnded ||
      this.childRef !== prevState?.childRef ||
      productsIds.length !== prevProps.productsIds.length) {
      const options: IntersectionObserverInit = {
        root: null,
        rootMargin: '0px',
        threshold: 0
      }

      const observer =
        new IntersectionObserver(([target]) => {
          if (target.isIntersecting) {
            nextPage()
          }
        }, options)

      if (!isValuesEnded) {
        if (this.childRef.current !== null) {
          observer.observe(this.childRef.current)
        }
      } else {
        if (this.childRef.current !== null) {
          observer.unobserve(this.childRef.current)
        }
      }
    }
    return false
  }

  render (): React.ReactNode {
    const { productsIds, isValuesEnded, className, nextPage, ...rest } = this.props

    return (
      <div
        className={cn(styles.container, className)}
        {...rest}
      >
        {productsIds.map((id) =>
          <Product key={id} productId={id} />
        )}
        {productsIds.length !== 0
          ? <div className={styles.scrollEnd} ref={this.childRef} />
          // We can see footer while page is loading for a short period of time if we don't set this
          : <Centered className={styles.loadingFooterBlocker}>{'Loading...'}</Centered>
        }
      </div>
    )
  }
}

export default connector(ProductsFeed)
