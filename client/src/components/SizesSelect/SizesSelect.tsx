import React, { useState } from 'react'
import styles from './SizesSelect.module.css'
import cn from 'classnames'
import { ISizesSelect } from './SizesSelect.types'
import { parsedSize } from '../../store/reducers/types'

const SizesSelect = ({ sizesSize, defaultSize, sizes, className, onSizeSelect, onClick, ...props }: ISizesSelect) => {
  const [selectedSize, setSelectedSize] = useState(defaultSize)

  const sizeSelect = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, newSize: parsedSize) => {
    setSelectedSize(newSize)

    if (onSizeSelect !== undefined) onSizeSelect(newSize)
    if (onClick !== undefined) onClick(e)
  }

  return (
    <div className={cn(styles.sizesContainer, {
      [styles.small]: sizesSize === 'small',
      [styles.large]: sizesSize === 'large'
    })}>
      {sizes.map((size) =>
        <button
          className={cn(styles.sizeButton, className, {
            [styles.selectedSizeButton]: size === selectedSize,
            [styles.small]: sizesSize === 'small',
            [styles.large]: sizesSize === 'large'
          })}
          key={size}
          onClick={(e) => sizeSelect(e, size)}
          {...props}
        >
          {size}
        </button>
      )}
    </div>
  )
}

export default SizesSelect
