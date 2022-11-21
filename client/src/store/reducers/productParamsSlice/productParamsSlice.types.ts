import { Gender } from '../../../http/categoryApi/categoryApi.types'

export interface IProductState {
  limit: number
  page: number

  selectedCategoryId?: number
  selectedBrandId?: number
  selectedGender: Gender
}
