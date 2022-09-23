import { CreationAttributes } from '../types'

export interface ICategory {
  id: number
  name: string
  gender: string

  createdAt: Date
  updatedAt: Date
}

export type CategoryCreate = CreationAttributes<ICategory>
export interface IBrand {
  id: number
  name: string

  createdAt: Date
  updatedAt: Date
}

export type IBrandCreate = CreationAttributes<IBrand>

export interface IColor {
  id: number
  hex: string

  createdAt: Date
  updatedAt: Date
}

export type IColorCreate = CreationAttributes<IColor> & {
  id: Date
}

export interface IProduct {
  id: number
  description: string
  price: number
  images: string

  CategoryId: number
  BrandId: number

  createdAt: Date
  updatedAt: Date
}

export interface IProductWithBrandAndCategory extends IProduct {
  Category: ICategory
  Brand: IBrand
}

export interface IProductWithBrandCategoryAndColors extends IProductWithBrandAndCategory {
  Colors: IColor[]
}

export interface IProductsWithCount {
  count: number
  rows: IProductWithBrandAndCategory[]
}

export interface IProductState {
  categories: ICategory[]
  brands: IBrand[]
  products: IProductWithBrandAndCategory[]

  limit: number
  page: number

  amountOfProducts: number
  selectedCategory: ICategory | undefined
  selectedGender: string | undefined
}
