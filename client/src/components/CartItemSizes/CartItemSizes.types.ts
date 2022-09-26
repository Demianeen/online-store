import { ISizesSelect } from './../SizesSelect/SizesSelect.types'
import { ICartItem } from '../../store/reducers/CartSlice/types'

export interface ICartItemSizes extends Omit<ISizesSelect, 'sizes' | 'defaultSize'> {
  cartItem: ICartItem
}
