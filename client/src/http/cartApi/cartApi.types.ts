import { CreationAttributes, parsedSize } from '../../store/reducers/types'
import { IProductWithBrandAndCategory } from '../../store/reducers/ProductSlice/types'

export interface ChangeCartItemQuantity {
  cartItemId: number
  quantity: number
}

export interface ChangeCartItemSize {
  cartItemId: number
  size: parsedSize
}

export interface IRowData {
  createdAt: string
  updatedAt: string
}

// we can't store class instances like Date in redux
export interface IParsedData {
  createdAt: number
  updatedAt: number
}

export interface ICartItemWithoutRaw {
  id: number
  quantity: number

  CartId: number
  ProductId: number
  size: parsedSize

  Product: IProductWithBrandAndCategory
}

export interface ICartItem extends ICartItemWithoutRaw, IParsedData {
}

export interface ICartItemRaw extends ICartItemWithoutRaw, IRowData {
}

export type CartItemCreate = CreationAttributes<ICartItem, 'quantity' | 'Product'>

export interface ICartWithoutRaw {
  id: number
  UserId: number
}

export interface ICart extends ICartWithoutRaw, IParsedData {
  Items: ICartItem[]
}

export interface ICartRaw extends ICartWithoutRaw, IRowData {
  Items: ICartItemRaw[]
}
