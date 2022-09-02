export interface IType {
  id: number
  name: string
}

export interface IBrand {
  id: number
  name: string
}

export interface IInfo {
  id: number
  title: string
  text: string
}

export interface IDevice {
  id: number
  name: string
  price: number
  rating: number
  img: string
  TypeId: number
  BrandId: number
  createdAt: Date
  updatedAt: Date
  info?: IInfo[]
}

export interface IDeviceState {
  types: IType[]
  brands: IBrand[]
  devices: IDevice[]
  selectedType: string | null
  selectedBrand: string | null
}
