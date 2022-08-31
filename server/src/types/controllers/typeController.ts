import { Request } from 'express'

interface IRequestBody {
  name?: string
}

export type typeRequest = Request<{}, {}, IRequestBody, {}>
