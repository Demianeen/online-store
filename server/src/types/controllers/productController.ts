import { CreationAttributes } from './index.js'
import { Request } from 'express'
import { FindAndCountOptions, InferAttributes, InferCreationAttributes } from 'sequelize'
import { Product } from '../../api/models/Product.js'

type IRequestBodyCreate =
  CreationAttributes<InferCreationAttributes<Product>, 'images'> & {
    Colors?: string
  }

interface IProductWhere {
  where: Omit<IRequestQueryGetMany, 'limit' | 'page'>
}

interface IRequestQueryGetMany {
  CategoryId?: number
  BrandId?: number
  gender?: string
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
