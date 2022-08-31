import { NextFunction, Request, Response } from 'express'
import { typeRequest } from '../../types/controllers/typeController.js'
import ApiError from '../error/ApiError.js'
import { Type } from '../models/Type.js'

class TypeController {
  async create (req: typeRequest, res: Response, next: NextFunction): Promise<void> {
    const { name } = req.body
    if (!name) {
      return next(ApiError.badRequest('Name is required'))
    }
    const newType = await Type.create({ name })
    res.json(newType)
  }

  async getAll (req: Request, res: Response): Promise<void> {
    const types = await Type.findAll()
    res.json(types)
  }
}

export default new TypeController()
