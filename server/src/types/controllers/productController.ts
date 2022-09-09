import { Request } from 'express'
import { FindAndCountOptions, InferAttributes } from 'sequelize'
import { Brand } from '../../api/models/Brand.js'
import { Category } from '../../api/models/Category.js'
import { Product } from '../../api/models/Product.js'

interface IRequestBodyCreate {
  description?: string
  price?: number
  gender?: string
  BrandId: Brand['id']
  CategoryId?: Category['id']
  Colors?: string
}

interface IProductWhere {
  where: Omit<IRequestQueryGetMany, 'limit' | 'page'>
}

interface IRequestQueryGetMany {
  CategoryId?: Category['id']
  BrandId?: Brand['id']
  limit?: number
  page?: number
}

export interface IRequestParamsGetOne {
  id?: number
}

export type productCreateRequest = Request<{}, {}, IRequestBodyCreate, {}>
export type productGetManyRequest = Request<{}, {}, {}, IRequestQueryGetMany>

export type Options = Omit<FindAndCountOptions<InferAttributes<Product, {
  omit: never
}>>, 'group'> & IProductWhere
