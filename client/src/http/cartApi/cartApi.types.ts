import { EntityId } from '@reduxjs/toolkit'
import { IParsedMeta, IRawMeta } from './../index.types'
import { CreationAttributes, parsedSize } from '../../store/reducers/types'
import { IProductRaw } from '../productApi/productApi.types'
import { ResultDescription } from '@reduxjs/toolkit/dist/query/endpointDefinitions'

export interface IChangeCartItemQuantity {
  cartItemId: EntityId
  difference: number
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

export type InvalidateCartOnError = ResultDescription<'cart', unknown, unknown, unknown, unknown | undefined> | undefined
