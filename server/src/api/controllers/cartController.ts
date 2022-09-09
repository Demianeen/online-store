import { getCartRequest } from './../../types/controllers/cartController.js'
import { CartItem } from './../models/CartItem.js'
import { NextFunction, Response } from 'express'
import { addCartItemRequest, createCartRequest } from '../../types/controllers/cartController.js'
import ApiError from '../error/ApiError.js'
import { Cart } from '../models/Cart.js'
import { Product } from '../models/Product.js'

class CartController {
  async create (req: createCartRequest, res: Response, next: NextFunction): Promise<void> {
    const { UserId } = req.body
    if (!UserId) return next(ApiError.badRequest('UserId is required'))
    const cart = await Cart.create({ UserId })
    res.json(cart)
  }

  async get (req: getCartRequest, res: Response, next: NextFunction): Promise<void> {
    const { UserId } = req.body
    if (!UserId) return next(ApiError.badRequest('UserId is required'))

    const cart = await Cart.findOne({
      where: { UserId },
      include: { model: CartItem, as: 'Items' }
    })

    res.json(cart)
  }

  async addItem (req: addCartItemRequest, res: Response, next: NextFunction): Promise<void> {
    const { CartId, ProductId } = req.body
    if (!CartId) return next(ApiError.badRequest('CartId is required'))
    if (!ProductId) return next(ApiError.badRequest('ProductId is required'))

    if (!await Cart.findByPk(CartId)) return next(ApiError.badRequest("The cart with this id isn't created."))
    if (!await Product.findByPk(ProductId)) return next(ApiError.badRequest("The product with this id isn't created."))
    if (await CartItem.findOne({ where: { CartId, ProductId } })) return next(ApiError.badRequest('This item is already in your cart.'))

    const cartItem = await CartItem.create({ CartId, ProductId })
    res.json(cartItem)
  }
}

export default new CartController()
