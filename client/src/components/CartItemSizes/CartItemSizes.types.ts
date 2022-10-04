import { ISizesSelect } from './../SizesSelect/SizesSelect.types'
import { ICartItem } from '../../http/cartApi/types'

export interface ICartItemSizes extends Omit<ISizesSelect, 'sizes' | 'defaultSize'> {
  cartItem: ICartItem
}
