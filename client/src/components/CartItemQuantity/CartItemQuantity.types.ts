import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ICartItem } from '../../store/reducers/CartSlice/types'

export interface ICartItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cartItem: ICartItem
}
