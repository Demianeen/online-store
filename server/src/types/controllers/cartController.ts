import { CartItem } from './../../api/models/CartItem.js'
import { Request } from 'express'
import { DestroyOptions, InferAttributes, InferCreationAttributes } from 'sequelize'
import { CreationAttributes } from './index.js'

interface ICartBody {
  CartId?: number
  UserId?: number
}

type CartItemBody = CreationAttributes<InferCreationAttributes<CartItem>>

interface ICartItemWhere {
  where: Partial<CartItemBody>
}

export type RemoveCartOptions = DestroyOptions<InferAttributes<CartItem, {
  omit: never
}>> & ICartItemWhere

export interface AdditionalOptions {
  difference: number
}

export type CartBodyRequest = Request<{}, {}, ICartBody, {}>
export type GetCartBodyRequest = Request<{}, {}, {}, ICartBody>
export type CreateCartBodyRequest = Request<{}, {}, CartItemBody, {}>
export type CartItemBodyRequest = Request<{}, {}, InferAttributes<CartItem> & AdditionalOptions, {}>
