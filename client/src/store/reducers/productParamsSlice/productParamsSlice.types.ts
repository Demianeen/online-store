import { Gender } from '../../../http/categoryApi/categoryApi.types'

export interface IProductParams {
  limit: number
  page: number

  // selectedCategoryId?: number
  // selectedBrandId?: number
  selectedGender: Gender
}

export interface IProductState {
  params: IProductParams
  isValuesEnded: boolean
}
