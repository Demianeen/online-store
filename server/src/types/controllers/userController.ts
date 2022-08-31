import { Request } from 'express'

interface IRequestQueryCheck {
  id?: number
  limit?: number
}

interface IRequestQueryLogin {
  email: string
  password: string
}

interface IRequestQueryRegistration extends Partial<IRequestQueryLogin> {
  role?: string
}

export type userRequestCheck = Request<{}, {}, {}, IRequestQueryCheck>
export type userRequestLogin = Request<{}, {}, IRequestQueryLogin, {}>
export type userRequestRegistration = Request<{}, {}, IRequestQueryRegistration, {}>
