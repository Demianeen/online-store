import { CartItem } from './../../api/models/CartItem.js'
import { Product } from './../../api/models/Product.js'
import { Request } from 'express'
import { Cart } from '../../api/models/Cart.js'
import { User } from '../../api/models/User.js'
import { DestroyOptions, InferAttributes } from 'sequelize'

interface ICartBody {
  UserId?: User['id']
}

interface ICartItemBody {
  CartId?: Cart['id']
  ProductId?: Product['id']
}

interface IChangeQuantityCartItemBody {
  id?: CartItem['id']
  quantity?: number
}

interface ICartItemWhere {
  where: ICartItemBody
}

export type RemoveCartOptions = DestroyOptions<InferAttributes<CartItem, {
  omit: never
}>> & ICartItemWhere

export type createCartRequest = Request<{}, {}, ICartBody, {}>
export type getCartRequest = Request<{}, {}, {}, ICartBody>
export type addCartItemRequest = Request<{}, {}, ICartItemBody, {}>
export type removeCartItemRequest = Request<{}, {}, ICartItemBody, {}>
export type changeQuantityCartItemRequest = Request<{}, {}, IChangeQuantityCartItemBody, {}>
