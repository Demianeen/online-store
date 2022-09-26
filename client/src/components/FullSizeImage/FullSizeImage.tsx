import React from 'react'
import styles from './FullSizeImage.module.css'
import cn from 'classnames'
import { IFullSizeImage } from './FullSizeImage.types'

const Product = ({ src, className, ...props }: IFullSizeImage) => {
  return (
    <div className={cn(styles.imageContainer, className)} {...props}>
      <img
        src={process.env.REACT_APP_API_URL + src}
        className={cn(styles.image, className)}
        {...props}
      />
    </div>
  )
}

export default Product
