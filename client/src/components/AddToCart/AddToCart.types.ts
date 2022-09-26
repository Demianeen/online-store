import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface IAddToCart
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  productId: number
  size: 'XS' | 'S' | 'M' | 'L' | 'XL'
  isInStock: boolean
  buttonSize: 'small' | 'large'
}
