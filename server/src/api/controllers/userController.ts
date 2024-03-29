import { NextFunction, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { userLoginRequest, userRegistrationRequest } from './../../types/controllers/userController.js'
import { userCheckRequest } from '../../types/controllers/userController.js'
import ApiError from '../error/ApiError.js'
import { Cart } from '../models/Cart.js'
import { User } from '../models/User.js'

dotenv.config()

const generateJwt = (id: number, email: string, role: string, CartId: number): string => {
  return jwt.sign(
    { id, email, role, CartId },
    process.env.SECRET_KEY,
    { expiresIn: '48h' }
  )
}

class UserController {
  // TODO: Add right jwt token authorization
  async registration
  (req: userRegistrationRequest, res: Response, next: NextFunction): Promise<void | Response> {
    const { email, password } = req.body
    if (!email || !password) return next(ApiError.badRequest('Email and password is required'))

    const candidate = await User.findOne({ where: { email } })
    if (candidate) return next(ApiError.badRequest('This email address already belongs to a user'))

    const hashedPassword = await bcrypt.hash(password, 5)
    const user = await User.create({ email, password: hashedPassword })
    const cart = await Cart.create({ UserId: user.id })

    const token = generateJwt(user.id, user.email, user.role, cart.id)

    return res.json(token)
  }

  async login (req: userLoginRequest, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body
    if (!email || !password) return next(ApiError.badRequest('Email and password is required'))

    const user = await User.findOne({ where: { email } })
    if (!user) {
      console.log('User with', email, 'not found')
      return next(ApiError.badRequest('Email or password is incorrect'))
    }

    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      console.log('Password mismatch, password:', password, 'comparePassword', comparePassword)
      return next(ApiError.badRequest('Email or password is incorrect'))
    }

    const cart = await Cart.findOne({ where: { UserId: user.id } })
    if (!cart) return next(ApiError.internal())

    const token = generateJwt(user.id, user.email, user.role, cart.id)
    res.json(token)
  }

  check (req: userCheckRequest, res: Response, next: NextFunction): void {
    if (!req.user) {
      return next(ApiError.internal("User isn't authorized"))
    }

    const token = generateJwt(req.user.id, req.user.email, req.user.role, req.user.CartId)
    res.json(token)
  }
}

export default new UserController()
