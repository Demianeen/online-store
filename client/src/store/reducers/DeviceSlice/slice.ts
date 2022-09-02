import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBrand, IDevice, IDeviceState, IType } from './types'

const initialState: IDeviceState = {
  types: [
    { id: 1, name: 'phones' },
    { id: 2, name: 'fridges' },
    { id: 3, name: 'laptops' },
    { id: 4, name: 'tvs' }
  ],
  brands: [{ id: 1, name: 'apple' }, { id: 2, name: 'samsung' }],
  devices: [
    { id: 1, BrandId: 1, TypeId: 1, img: 'https://media.currys.biz/i/currysprod/10236204?$l-large$&fmt=auto', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 2, BrandId: 1, TypeId: 1, img: 'https://media.currys.biz/i/currysprod/10236204?$l-large$&fmt=auto', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 1, BrandId: 1, TypeId: 1, img: 'https://media.currys.biz/i/currysprod/10236204?$l-large$&fmt=auto', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() },
    { id: 1, BrandId: 1, TypeId: 1, img: 'https://media.currys.biz/i/currysprod/10236204?$l-large$&fmt=auto', name: 'iphone 13', price: 799, rating: 4, createdAt: new Date(), updatedAt: new Date() }
  ],
  selectedType: null,
  selectedBrand: null
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
    },
    selectType (
      state: IDeviceState,
      action: PayloadAction<string>
    ) {
      state.selectedType = action.payload
    },
    selectBrand (
      state: IDeviceState,
      action: PayloadAction<string>
    ) {
      state.selectedBrand = action.payload
    }
  }
})

export default deviceSlice
