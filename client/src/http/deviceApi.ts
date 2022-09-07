import { IBrand, IBrandCreate, IDevice, IDeviceCreate, IType, ITypeCreate } from './../store/reducers/DeviceSlice/types'
import { $authHost, $host } from '.'

interface IDevicesWithCount {
  count: number
  rows: IDevice[]
}

export const createType = async (type: ITypeCreate) => {
  // TODO: Check if user is admin
  const { data } = await $authHost.post<IType>('api/type', type)
  return data
}

export const fetchTypes = async () => {
  const { data } = await $host.get<IType[]>('api/type')
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

export const createDevice = async (device: IDeviceCreate) => {
  const { data } = await $authHost.post<IDeviceCreate>('api/device', device, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
  return data
}

export const fetchDevices =
  async (limit?: number, page?: number, selectedTypeId?: number, selectedBrandId?: number) => {
    const { data } = await $host.get<IDevicesWithCount>('api/device', {
      params: {
        limit, page, TypeId: selectedTypeId, BrandId: selectedBrandId
      }
    })
    return data
  }

export const fetchOneDevice = async (id: number) => {
  const { data } = await $host.get<IDevice>('api/device/' + id.toString())
  return data
}
