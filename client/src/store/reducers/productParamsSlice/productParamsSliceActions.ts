import { createAction } from '@reduxjs/toolkit'
import { Gender } from '../../../http/categoryApi/categoryApi.types'

export const selectCategory = createAction<number>('product/selectCategory')
export const selectBrand = createAction<number>('product/selectBrand')
export const selectGender = createAction<Gender>('product/selectGender')

export const setLimit = createAction<number>('product/setLimit')
export const nextPage = createAction('product/nextPage')
export const previousPage = createAction('product/previousPage')
