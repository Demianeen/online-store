import { Request } from 'express'

export interface IDeviceInfo {
  title: string
  desc: string
}

interface IRequestBodyCreate {
  name?: string
  price?: number
  BrandId?: number
  TypeId?: number
  info?: string
}

interface IRequestQueryGetMany {
  BrandId?: number
  TypeId?: number
  limit?: number
  page?: number
}

export interface IRequestParamsGetOne {
  id?: number
}

export type deviceRequestCreate = Request<{}, {}, IRequestBodyCreate, {}>
export type deviceRequestGetMany = Request<{}, {}, {}, IRequestQueryGetMany>
