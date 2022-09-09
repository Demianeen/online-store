import { Product } from './../../api/models/Product.js'
import { Request } from 'express'
import { Cart } from '../../api/models/Cart.js'
import { User } from '../../api/models/User.js'

interface IRequestCartBody {
  UserId?: User['id']
}

interface IRequestCartItemBody {
  CartId?: Cart['id']
  ProductId?: Product['id']
}

export type createCartRequest = Request<{}, {}, IRequestCartBody, {}>
export type getCartRequest = Request<{}, {}, IRequestCartBody, {}>
export type addCartItemRequest = Request<{}, {}, IRequestCartItemBody, {}>
