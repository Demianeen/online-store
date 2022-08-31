import { NextFunction, Request, Response } from 'express'
import ApiError from '../error/ApiError.js'

const errorHandlerMiddleware =
  (err: ApiError, req: Request, res: Response, next: NextFunction): Response => {
    if (err instanceof Error) {
      return res.status(err.status).json({ message: err.message })
    }
    return res.status(500).json({ message: 'Uncaught error' })
  }

export default errorHandlerMiddleware
