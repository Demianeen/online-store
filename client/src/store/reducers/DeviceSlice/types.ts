export interface IType {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface ITypeCreate {
  name: string
}
export interface IBrand {
  id: number
  name: string
  createdAt: Date
  updatedAt: Date
}

export interface IInfo {
  id: number
  title: string
  desc: string
  createdAt: Date
  updatedAt: Date
}

export interface IBrandCreate {
  name: string
}

export interface IInfoCreate {
  id: Date
  title: string
  desc: string
}

export interface IDevice {
  id: number
  name: string
  price: number
  rating: number
  img: File
  TypeId: number
  BrandId: number
  createdAt: Date
  updatedAt: Date
  info: IInfo[]
}

export interface IDeviceCreate {
  name: string
  price: number
  img: File
  TypeId: number
  BrandId: number
  info?: string
}

export interface IDeviceState {
  types: IType[]
  brands: IBrand[]
  devices: IDevice[]
  selectedType: string | null
  selectedBrand: string | null
}
