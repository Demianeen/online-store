import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IBrand, IDevice, IDeviceState, IType } from './types'

const initialState: IDeviceState = {
  types: [],
  brands: [],
  devices: [],
  amountOfDevices: 0,
  limit: 2,
  page: 1,
  selectedTypeId: undefined,
  selectedBrandId: undefined
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
      action: PayloadAction<number>
    ) {
      state.page = 1
      state.selectedTypeId = action.payload
    },
    selectBrand (
      state: IDeviceState,
      action: PayloadAction<number>
    ) {
      state.page = 1
      state.selectedBrandId = action.payload
    },
    setAmountOfDevices (
      state: IDeviceState,
      action: PayloadAction<number>
    ) {
      state.amountOfDevices = action.payload
    },
    setLimit (
      state: IDeviceState,
      action: PayloadAction<number>
    ) {
      state.limit = action.payload
    },
    setPage (
      state: IDeviceState,
      action: PayloadAction<number>
    ) {
      state.page = action.payload
    }
  }
})

export default deviceSlice
