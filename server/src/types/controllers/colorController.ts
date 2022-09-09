import { Request } from 'express'

interface IRequestBody {
  hex?: string
}

export interface IColor {
  hex: string
}

export type colorRequest = Request<{}, {}, IRequestBody, {}>
