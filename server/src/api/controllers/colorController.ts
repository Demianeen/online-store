import { NextFunction, Request, Response } from 'express'
import { colorRequest } from '../../types/controllers/colorController.js'
import ApiError from '../error/ApiError.js'
import { Color } from '../models/Color.js'

class ColorController {
  async create (req: colorRequest, res: Response, next: NextFunction): Promise<void> {
    const { hex } = req.body
    if (!hex) return next(ApiError.badRequest('Hex is required'))

    const color = await Color.create({ hex })
    res.json(color)
  }

  async getAll (req: Request, res: Response): Promise<void> {
    const colors = await Color.findAll()
    res.json(colors)
  }
}

export default new ColorController()
