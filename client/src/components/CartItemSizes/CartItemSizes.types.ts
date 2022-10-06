import { EntityId } from '@reduxjs/toolkit'
import { ISizesSelect } from './../SizesSelect/SizesSelect.types'

export interface ICartItemSizes extends Omit<ISizesSelect, 'sizes' | 'defaultSize'> {
  cartItemId: EntityId
}
