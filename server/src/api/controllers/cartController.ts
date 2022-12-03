import { CartItemBodyRequest, GetCartBodyRequest, RemoveCartOptions, CartBodyRequest } from './../../types/controllers/cartController.js'
import { CartItem } from './../models/CartItem.js'
import { NextFunction, Response } from 'express'
import ApiError from '../error/ApiError.js'
import { Cart } from '../models/Cart.js'
import { Product } from '../models/Product.js'

const isSizeValid = (size: string): size is 'XS' | 'S' | 'M' | 'L' | 'XL' => {
  return size === 'XS' || size === 'S' || size === 'M' || size === 'L' || size === 'XL'
}

class CartController {
  async create (req: CartBodyRequest, res: Response, next: NextFunction): Promise<void> {
    const { UserId } = req.body
    if (!UserId) return next(ApiError.badRequest('UserId is required'))
    const cart = await Cart.create({ UserId })
    res.json(cart)
  }

  async getCartItems (req: GetCartBodyRequest, res: Response, next: NextFunction): Promise<void> {
    const { CartId } = req.query
    if (!CartId) return next(ApiError.badRequest('UserId is required'))

    const cartItems = await CartItem.findAll({
      where: { CartId },
      include: {
        model: Product,
        as: 'Product'
      }
    })

    res.json(cartItems)
  }

  async addItem (req: CartItemBodyRequest, res: Response, next: NextFunction): Promise<void> {
    const { CartId, ProductId, size } = req.body
    if (!CartId) return next(ApiError.badRequest('CartId is required'))
    if (!ProductId) return next(ApiError.badRequest('ProductId is required'))
    if (!size) return next(ApiError.badRequest('Size is required'))

    if (!await Cart.findByPk(CartId)) return next(ApiError.badRequest("The cart with this id isn't created."))
    if (!await Product.findByPk(ProductId)) return next(ApiError.badRequest("The product with this id isn't created."))
    if (await CartItem.findOne({ where: { CartId, ProductId } })) return next(ApiError.badRequest('This item is already in your cart.'))

    const cartItem = await CartItem.create({ CartId, ProductId, size })
    res.json(cartItem)
  }

  async removeItems (req: CartItemBodyRequest, res: Response, next: NextFunction): Promise<void> {
    const { CartId, ProductId } = req.body
    if (!CartId) return next(ApiError.badRequest('CartId is required'))

    const options: RemoveCartOptions = {
      where: { CartId }
    }

    if (ProductId) {
      options.where.ProductId = ProductId
    }

    const removedItemsQuantity = await CartItem.destroy(options)
    res.json(removedItemsQuantity)
  }

  async changeItemQuantityBy (req: CartItemBodyRequest, res: Response, next: NextFunction): Promise<void> {
    const { id, difference } = req.body
    if (!id) return next(ApiError.badRequest('Id is required'))
    if (difference === undefined) return next(ApiError.badRequest('Difference is required'))

    const item = await CartItem.findByPk(id)
    if (!item) return next(ApiError.badRequest("The cart item with this id isn't created."))

    const updatedQuantity = item.quantity + difference

    if (updatedQuantity === 0) {
      await CartItem.destroy({ where: { id } })
      res.json(0)
      return
    }

    await CartItem.update({ quantity: updatedQuantity }, {
      where: { id }
    })

    res.json(updatedQuantity)
  }

  async changeItemSize (req: CartItemBodyRequest, res: Response, next: NextFunction): Promise<void> {
    const { id, size } = req.body
    if (!id) return next(ApiError.badRequest('Id is required'))
    if (size === undefined) return next(ApiError.badRequest('Size is required'))
    if (!isSizeValid(size)) return next(ApiError.badRequest('Invalid size value'))

    if (!await CartItem.findByPk(id)) return next(ApiError.badRequest("The cart item with this id isn't created."))

    const changedQuantity = await CartItem.update({ size }, {
      where: { id },
      returning: true
    })

    // if returning: true update return array in which
    // first is amount of rows affected and second the affected row array
    res.json(changedQuantity[1][0].quantity)
  }
}

export default new CartController()
