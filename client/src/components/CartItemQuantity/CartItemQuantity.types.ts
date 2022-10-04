import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { ICartItem } from '../../http/cartApi/types'

export interface ICartItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cartItem: ICartItem
}
