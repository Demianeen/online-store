import { IBrand, IBrandCreate, ICategory, ICategoryCreate, IProductCreate, IProductsWithCount, IProductWithColors } from '../store/reducers/ProductSlice/types'
import { $authHost, $host } from '.'

export const createCategory = async (category: ICategoryCreate) => {
  const { data } = await $authHost.post<ICategory>('api/category', category)
  return data
}

export const fetchCategories = async () => {
  const { data } = await $host.get<ICategory[]>('api/category')
  return data
}

export const createBrand = async (brand: IBrandCreate) => {
  const { data } = await $authHost.post<IBrand>('api/brand', brand)
  return data
}

export const fetchBrands = async () => {
  const { data } = await $host.get<IBrand[]>('api/brand')
  return data
}

export const createProduct = async (product: FormData) => {
  const { data } = await $authHost.post<IProductCreate>('api/product', product, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
}

export const fetchProducts =
  async (limit?: number, page?: number, CategoryId?: number, gender?: string) => {
    const { data } = await $host.get<IProductsWithCount>('api/product', {
      params: {
        limit, page, CategoryId, gender
      }
    })
    return data
  }

export const fetchOneProduct = async (id: number) => {
  const { data } = await $host.get<IProductWithColors>('api/product/' + id.toString())
  return data
}
