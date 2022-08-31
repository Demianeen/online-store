import { NextFunction, Request, Response } from 'express'
import { brandRequest } from '../../types/controllers/brandController.js'
import ApiError from '../error/ApiError.js'
import { Brand } from '../models/Brand.js'

class DeviceController {
  async create (req: brandRequest, res: Response, next: NextFunction): Promise<void> {
    const { name } = req.body
    if (!name) {
      return next(ApiError.badRequest('Name is required'))
    }
    const newBrand = await Brand.create({ name })
    res.json(newBrand)
  }

  async getAll (req: Request, res: Response): Promise<void> {
    const brands = await Brand.findAll()
    res.json(brands)
  }
}

export default new DeviceController()
