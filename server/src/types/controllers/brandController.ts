import { Request } from 'express'

interface IRequestBody {
  name?: string
}

export type brandRequest = Request<{}, {}, IRequestBody, {}>
