import { NextFunction, Request, Response } from 'express'
import { categoryRequest } from '../../types/controllers/categoryController.js'
import ApiError from '../error/ApiError.js'
import { Category } from '../models/Category.js'

const isGenderCorrect = (gender: string): gender is 'WOMEN' | 'MEN' | 'KIDS' => {
  return gender !== 'WOMEN' && gender !== 'MEN' && gender !== 'KIDS'
}

class CategoryController {
  async create (req: categoryRequest, res: Response, next: NextFunction): Promise<void> {
    const { name, gender } = req.body
    if (!name) return next(ApiError.badRequest('Name is required'))
    if (!gender) return next(ApiError.badRequest('Gender is required'))

    if (!Array.isArray(gender)) {
      return next(ApiError.badRequest('Gender must be an array'))
    }
    gender.forEach((el) => {
      if (isGenderCorrect(el)) return next(ApiError.badRequest('Invalid gender value'))
    })

    const category = await Category.create({ name, gender: JSON.stringify(gender) })
    res.json(category)
  }

  async getAll (req: Request, res: Response): Promise<void> {
    const categories = await Category.findAll()
    res.json(categories)
  }
}

export default new CategoryController()
