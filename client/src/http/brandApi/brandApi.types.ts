import { CreationAttributes } from '../../store/reducers/types'
import { IRawMeta } from '../index.types'

export interface ICategoryWithoutMeta {
  name: string
}

export interface ICategoryRaw extends ICategoryWithoutMeta, IRawMeta {
}

export interface ICategory extends ICategoryWithoutMeta, IRawMeta {
}
export type CategoryCreate = CreationAttributes<ICategory>
