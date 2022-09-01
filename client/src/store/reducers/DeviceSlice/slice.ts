import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBrand, IDevice, IDeviceState, IType } from './types'

const initialState: IDeviceState = {
  types: [{ id: 1, name: 'phone' }, { id: 2, name: 'fridge' }],
  brands: [{ id: 1, name: 'apple' }, { id: 2, name: 'samsung' }],
  devices: [
    { id: 1, BrandId: 1, TypeId: 1, img: 'https://www.freepik.com/photos/portrait', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 1, BrandId: 1, TypeId: 1, img: 'https://www.freepik.com/photos/portrait', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 1, BrandId: 1, TypeId: 1, img: 'https://www.freepik.com/photos/portrait', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 1, BrandId: 1, TypeId: 1, img: 'https://www.freepik.com/photos/portrait', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() }
  ]
}

const deviceSlice = createSlice({
  name: 'device',
  initialState,
  reducers: {
    setTypes (
      state: IDeviceState,
      action: PayloadAction<IType[]>
    ) {
      state.types = action.payload
    },
    setBrands (
      state: IDeviceState,
      action: PayloadAction<IBrand[]>
    ) {
      state.brands = action.payload
    },
    setDevices (
      state: IDeviceState,
      action: PayloadAction<IDevice[]>
    ) {
      state.devices = action.payload
    }
  }
})

export default deviceSlice
