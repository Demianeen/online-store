import { IProduct } from './../ProductSlice/types'

export interface ICartItem {
  id: number
  quantity: number

  CartId: number
  ProductId: number

  Product: IProduct

  createdAt: Date
  updatedAt: Date
}

export interface ICart {
  id: number
  UserId: number

  Items: ICartItem[]

  createdAt: Date
  updatedAt: Date
}

export interface ICartItemCreate {
  CartId: number
  ProductId: number
}

export interface IProductState {
  Items: ICartItem[]
  taxPercentage: number
  tax: number
  overallQuantity: number
  itemsPrice: number
}
