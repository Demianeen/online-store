import { NextFunction, Request, Response } from 'express'
import { productCreateRequest, productGetManyRequest, IRequestParamsGetOne, Options } from '../../types/controllers/productController.js'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '../error/ApiError.js'
import path from 'path'
import { Product } from '../models/Product.js'
import { Color } from '../models/Color.js'
import { IColor } from '../../types/controllers/colorController.js'
import { Category } from '../models/Category.js'
import { Brand } from '../models/Brand.js'

const isGenderCorrect = (gender: string): gender is 'WOMEN' | 'MEN' | 'KIDS' => {
  return gender !== 'WOMEN' && gender !== 'MEN' && gender !== 'KIDS'
}

class ProductController {
  async create (req: productCreateRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { CategoryId, BrandId, description, price, gender, Colors } = req.body
      if (!description) return next(ApiError.internal('Description is required'))
      if (!price) return next(ApiError.internal('Price is required'))
      if (!CategoryId) return next(ApiError.internal('CategoryId is required'))
      if (!BrandId) return next(ApiError.internal('BrandId is required'))
      if (!gender) return next(ApiError.internal('Gender is required'))

      const parsedGender: string | string[] = JSON.parse(gender)
      if (!Array.isArray(parsedGender)) {
        return next(ApiError.badRequest('Gender must be an array'))
      }
      parsedGender.forEach((el) => {
        if (isGenderCorrect(el)) return next(ApiError.badRequest('Invalid gender value'))
      })

      if (!req.files) return next(ApiError.internal('Images are not uploaded'))
      const { images } = req.files

      const fileNames: string[] = []
      if (Array.isArray(images)) {
        images.forEach((el, index) => {
          fileNames[index] = uuidv4() + '.jpg'
          el.mv(path.resolve('src/static/' + fileNames[index]))
        })
      } else {
        fileNames[0] = uuidv4() + '.jpg'
        images.mv(path.resolve('src/static/' + fileNames[0]))
      }

      const product = await Product.create({
        CategoryId,
        BrandId,
        price,
        description,
        gender: JSON.stringify(parsedGender),
        images: JSON.stringify(fileNames)
      })

      if (Colors) {
        const parsedColors: IColor[] = JSON.parse(Colors)
        parsedColors.forEach(async ({ hex }) => {
          const [color] = await Color.findOrCreate({ where: { hex } })
          product.addColor(color)
        })
      }

      res.json(product)
    } catch (error) {
      // TODO: Add error handling decorator
      if (error instanceof Error || error instanceof ApiError) {
        return next(ApiError.internal(error.message))
      }
      next(ApiError.internal(error as string))
    }
  }

  async getOne (req: Request, res: Response): Promise<void> {
    // TODO: Remove hardcode typing
    const { id } = req.params as IRequestParamsGetOne
    const device = await Product.findOne({
      where: { id },
      include: [{ model: Color, as: 'Colors' }, { model: Category, as: 'Category' }, { model: Brand, as: 'Brand' }]
    })
    res.json(device)
  }

  async getAll (req: productGetManyRequest, res: Response): Promise<void> {
    const { CategoryId, BrandId, limit = 9, page = 1 } = req.query
    const offset = page * limit - limit

    const options: Options = {
      where: {},
      include: [{ model: Category, as: 'Category' }, { model: Brand, as: 'Brand' }],
      limit,
      offset
    }

    if (CategoryId) {
      options.where.CategoryId = CategoryId
    }
    if (BrandId) {
      options.where.BrandId = BrandId
    }

    const productsAndQuantity = await Product.findAndCountAll(options)

    res.json(productsAndQuantity)
  }
}

export default new ProductController()