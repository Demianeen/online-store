import { Request } from 'express'

interface IRequestBody {
  name?: string
  gender?: string | string[]
}

export type categoryRequest = Request<{}, {}, IRequestBody, {}>
