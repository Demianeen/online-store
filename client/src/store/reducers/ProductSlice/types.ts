export interface ICategory {
  id: number
  name: string
  gender: string

  createdAt: Date
  updatedAt: Date
}

export interface ICategoryCreate {
  name: string
  gender: string[]
}
export interface IBrand {
  id: number
  name: string

  createdAt: Date
  updatedAt: Date
}

export interface IBrandCreate {
  name: string
}

export interface IColor {
  id: number
  hex: string

  createdAt: Date
  updatedAt: Date
}

export interface IColorCreate {
  id: Date
  hex: string
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

  Category: ICategory
  Brand: IBrand
}

export interface IProductWithColors extends IProduct {
  Colors: IColor[]
}

export interface IProductsWithCount {
  count: number
  rows: IProduct[]
}

// FIXME: Unused interface
export interface IProductCreate {
  description: string
  price: number
  images: File[]
  gender: string

  CategoryId: number
  BrandId: number

  Colors?: string
}

export interface IProductState {
  categories: ICategory[]
  brands: IBrand[]
  products: IProduct[]

  limit: number
  page: number

  amountOfProducts: number
  selectedCategory: ICategory | undefined
  selectedGender: string | undefined
}
