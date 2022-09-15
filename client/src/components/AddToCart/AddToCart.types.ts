import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

export interface IAddToCart extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  productId: number
}
