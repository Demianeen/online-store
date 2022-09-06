import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBrand, IDevice, IDeviceState, IType } from './types'

const initialState: IDeviceState = {
  types: [],
  brands: [],
  devices: [],
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
