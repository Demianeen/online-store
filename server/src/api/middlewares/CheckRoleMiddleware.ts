import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { UserIDJwtPayload } from '../../types/middlewares/AuthMiddleware.js'
import { User } from '../models/User.js'

const checkRoleMiddleware = (role: User['role']) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.method === 'OPTIONS') {
      next()
    }

    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (!token) {
        return res.status(401).json({ message: 'User is not authorized' })
      }
      const decoded = jwt.verify(token, process.env.SECRET_KEY)
      if ((decoded as User).role !== role) {
        return res.status(403).json({ message: "You don't have enough access" })
      }

      req.user = decoded as UserIDJwtPayload
      next()
    } catch (error) {
      res.status(401).json({ message: 'User is not authorized' })
    }
  }
}

export default checkRoleMiddleware
