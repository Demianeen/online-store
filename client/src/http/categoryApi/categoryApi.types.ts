import { CreationAttributes } from '../../store/reducers/types'
import { IRawMeta } from '../index.types'

export interface ICategoryWithoutMeta {
  name: string
}

export type Gender = 'WOMEN' | 'MEN' | 'KIDS'

export interface ICategoryRaw extends ICategoryWithoutMeta, IRawMeta {
  gender: string
}

export interface ICategory extends ICategoryWithoutMeta, IRawMeta {
  gender: Gender[]
}
export type CategoryCreate = CreationAttributes<ICategory>
