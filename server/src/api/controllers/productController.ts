import { NextFunction, Request, Response } from 'express'
import { productCreateRequest, productGetManyRequest, Options } from '../../types/controllers/productController.js'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '../error/ApiError.js'
import path from 'path'
import { Product } from '../models/Product.js'
import { Color } from '../models/Color.js'
import { IColor } from '../../types/controllers/colorController.js'
import { Category } from '../models/Category.js'
import { Brand } from '../models/Brand.js'

const isGenderCorrect = (gender: string): gender is 'WOMEN' | 'MEN' | 'KIDS' => {
  return gender === 'WOMEN' || gender === 'MEN' || gender === 'KIDS'
}

class ProductController {
  async create (req: productCreateRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const { CategoryId, BrandId, description, price, gender, isInStock, Colors } = req.body
      if (!description) return next(ApiError.internal('Description is required'))
      if (!price) return next(ApiError.internal('Price is required'))
      if (!CategoryId) return next(ApiError.internal('CategoryId is required'))
      if (!BrandId) return next(ApiError.internal('BrandId is required'))
      if (!gender) return next(ApiError.internal('Gender is required'))

      if (!isGenderCorrect(gender)) return next(ApiError.badRequest('Invalid gender value'))

      if (!req.files) return next(ApiError.internal('Images are not uploaded'))
      const { images } = req.files

      const fileNames: string[] = []
      if (Array.isArray(images)) {
        images.forEach((el, index) => {
          fileNames[index] = uuidv4() + '.png'
          el.mv(path.resolve('src/static/' + fileNames[index]))
        })
      } else {
        fileNames[0] = uuidv4() + '.png'
        images.mv(path.resolve('src/static/' + fileNames[0]))
      }

      const product = await Product.create({
        CategoryId,
        BrandId,
        price,
        description,
        gender,
        isInStock,
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

  async getOne (req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params
    if (!id) return next(ApiError.badRequest('Id is required'))

    const device = await Product.findOne({
      where: { id },
      include: [{ model: Color, as: 'Colors' }, { model: Category, as: 'Category' }, { model: Brand, as: 'Brand' }]
    })
    res.json(device)
  }

  async getAll (req: productGetManyRequest, res: Response): Promise<void> {
    const { CategoryId, BrandId, gender, limit = 9, page = 1 } = req.query
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
    if (gender) {
      options.where.gender = gender
    }

    const productsAndQuantity = await Product.findAndCountAll(options)

    res.json(productsAndQuantity)
  }
}

export default new ProductController()
