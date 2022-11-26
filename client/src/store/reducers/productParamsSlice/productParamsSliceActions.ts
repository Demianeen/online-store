import { createAction } from '@reduxjs/toolkit'
import { Gender } from '../../../http/categoryApi/categoryApi.types'

// export const selectCategory = createAction<number>('productParams/selectCategory')
// export const selectBrand = createAction<number>('productParams/selectBrand')
export const selectGender = createAction<Gender>('productParams/selectGender')

export const setLimit = createAction<number>('productParams/setLimit')

export const nextPage = createAction('productParams/nextPage')
export const setPage = createAction<number>('productParams/setPage')

export const endValues = createAction('productParams/endValues')

export const toggleIsNeedToResetState = createAction('productParams/toggleIsNeedToResetState')
