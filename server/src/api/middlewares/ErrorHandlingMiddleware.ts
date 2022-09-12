import { NextFunction, Request, Response } from 'express'
import ApiError from '../error/ApiError.js'

const errorHandlerMiddleware =
  (err: unknown, req: Request, res: Response, next: NextFunction): Response => {
    if (err instanceof ApiError) {
      return res.status(err.status).json({ message: err.message })
    }
    if (err instanceof Error) {
      return res.status(500).json({ message: err.message })
    }
    return res.status(500).json({ message: (err as any).message })
  }

export default errorHandlerMiddleware
