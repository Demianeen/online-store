import { EntityId } from '@reduxjs/toolkit'
import { IParsedMeta, IRawMeta } from './../index.types'
import { CreationAttributes, parsedSize } from '../../store/reducers/types'
import { IProductRaw } from '../productApi/productApi.types'

export interface IChangeCartItemQuantity {
  cartItemId: EntityId
  quantity: number
}

export interface IChangeCartItemSize {
  cartItemId: EntityId
  size: parsedSize
}

export interface ICartItemWithoutMeta {
  quantity: number

  Product: IProductRaw

  CartId: number
  ProductId: number
  size: parsedSize
}

export interface ICartItemRaw extends ICartItemWithoutMeta, IRawMeta {
}

export interface ICartItem extends ICartItemWithoutMeta, IParsedMeta {
}

export type CartItemCreate = CreationAttributes<ICartItem, 'quantity' | 'Product'>
