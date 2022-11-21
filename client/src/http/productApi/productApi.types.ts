import { parsedSize } from './../../store/reducers/types'
import { CreationAttributes } from '../../store/reducers/types'
import { Gender } from '../categoryApi/categoryApi.types'
import { IRawMeta } from '../index.types'

export interface IGetProducts {
  limit: number
  page: number
  selectedGender: Gender
  selectedCategoryId?: number
  selectedBrandId?: number
}

export interface IProductWithoutMeta {
  description: string
  price: number
  isInStock: boolean

  CategoryId: number
  BrandId: number
}

export interface IProductRaw extends IProductWithoutMeta, IRawMeta {
  sizes: string
  images: string
}

export interface IProduct extends IProductWithoutMeta, IRawMeta {
  sizes: parsedSize[]
  images: string[]
}

export type ProductCreate = CreationAttributes<IProduct>
