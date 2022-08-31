import { NextFunction, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { userRequestLogin, userRequestRegistration } from './../../types/controllers/userController.js'
import { userRequestCheck } from '../../types/controllers/userController.js'
import ApiError from '../error/ApiError.js'
import { Basket } from '../models/Basket.js'
import { User } from '../models/User.js'

dotenv.config()

const generateJwt = (id: number, email: string, role: string): string => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  )
}

class UserController {
  // TODO: Add right jwt token authorization
  async registration
  (req: userRequestRegistration, res: Response, next: NextFunction): Promise<void | Response> {
    const { email, password, role } = req.body
    console.log(email, password)
    if (!email || !password) {
      return next(ApiError.badRequest('Email and password is required'))
    }
    console.log('EMAIL', email)

    const candidate = await User.findOne({ where: { email } })
    if (candidate) {
      console.log('CANDIDATE', candidate)
      return next(ApiError.badRequest('This email address already belongs to a user'))
    }

    const hashedPassword = await bcrypt.hash(password, 5)
    // TODO: Change all newUser to user
    const user = await User.create({ email, role, password: hashedPassword })
    Basket.create({ UserId: user.id })

    const token = generateJwt(user.id, user.email, user.role)

    return res.json(token)
  }

  async login (req: userRequestLogin, res: Response, next: NextFunction): Promise<void> {
    const { email, password } = req.body
    const user = await User.findOne({ where: { email } })
    if (!user) {
      return next(ApiError.badRequest('Email or password is incorrect'))
    }

    const comparePassword = bcrypt.compareSync(password, user.password)
    if (!comparePassword) {
      return next(ApiError.badRequest('Email or password is incorrect'))
    }

    const token = generateJwt(user.id, user.email, user.role)
    res.json(token)
  }

  check (req: userRequestCheck, res: Response, next: NextFunction): void {
    if (!req.user) {
      return next(ApiError.internal('User is undefined'))
    }
    const token = generateJwt(req.user.id, req.user.email, req.user.role)
    res.json(token)
  }
}

export default new UserController()
