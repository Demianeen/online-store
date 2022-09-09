import jwt from 'jsonwebtoken'
import { NextFunction, Response, Request } from 'express'
import { UserIDJwtPayload } from '../../types/middlewares/AuthMiddleware.js'

const authMiddleware = (req: Request, res: Response, next: NextFunction): void | Response => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    const token = req.headers.authorization?.split(' ')[1]
    if (!token) return res.status(401).json({ message: 'User is not authorized' })

    const decoded = jwt.verify(token, process.env.SECRET_KEY) as UserIDJwtPayload

    req.user = decoded

    next()
  } catch (error) {
    res.status(401).json({ message: 'User is not authorized' })
  }
}

export default authMiddleware
