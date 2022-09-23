import { CreationAttributes } from './../types'
import { IProductWithBrandAndCategory } from './../ProductSlice/types'

export interface ICartItem {
  id: number
  quantity: number

  CartId: number
  ProductId: number
  size: string

  Product: IProductWithBrandAndCategory

  createdAt: Date
  updatedAt: Date
}

export type CartItemCreate = CreationAttributes<ICartItem, 'quantity' | 'Product'>

export interface ICart {
  id: number
  UserId: number

  Items: ICartItem[]

  createdAt: Date
  updatedAt: Date
}

export interface IProductState {
  Items: ICartItem[]
  taxPercentage: number
  tax: number
  overallQuantity: number
  itemsPrice: number
}
