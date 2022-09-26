import { parsedSize } from '../../store/reducers/types'
import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface ISizesSelect extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  sizesSize: 'small' | 'large'
  sizes: parsedSize[]
  defaultSize: parsedSize
  onSizeSelect?: (newSize: parsedSize) => Promise<void> | void
}
