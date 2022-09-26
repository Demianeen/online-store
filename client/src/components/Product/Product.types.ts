import { IProductWithBrandAndCategory } from './../../store/reducers/ProductSlice/types'
import { DetailedHTMLProps, HTMLAttributes } from 'react'
export interface IProduct extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  product: IProductWithBrandAndCategory
}
