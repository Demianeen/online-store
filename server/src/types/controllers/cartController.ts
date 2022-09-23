import { CartItem } from './../../api/models/CartItem.js'
import { Request } from 'express'
import { DestroyOptions, InferAttributes, InferCreationAttributes } from 'sequelize'
import { CreationAttributes } from './index.js'

interface ICartBody {
  UserId?: number
}

type CartItemBody = CreationAttributes<InferCreationAttributes<CartItem>>

interface IChangeQuantityCartItemBody {
  id?: number
  quantity?: number
}

interface ICartItemWhere {
  where: Partial<CartItemBody>
}

export type RemoveCartOptions = DestroyOptions<InferAttributes<CartItem, {
  omit: never
}>> & ICartItemWhere

export type createCartRequest = Request<{}, {}, ICartBody, {}>
export type getCartRequest = Request<{}, {}, {}, ICartBody>
export type addCartItemRequest = Request<{}, {}, CartItemBody, {}>
export type removeCartItemRequest = Request<{}, {}, CartItemBody, {}>
export type changeQuantityCartItemRequest = Request<{}, {}, IChangeQuantityCartItemBody, {}>
