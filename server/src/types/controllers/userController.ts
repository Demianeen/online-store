import { Request } from 'express'

interface IRequestQueryCheck {
  id?: number
  limit?: number
}

interface IRequestQueryLogin {
  email?: string
  password?: string
}

interface IRequestQueryRegistration extends Partial<IRequestQueryLogin> {
  role?: string
}

export type userCheckRequest = Request<{}, {}, {}, IRequestQueryCheck>
export type userLoginRequest = Request<{}, {}, IRequestQueryLogin, {}>
export type userRegistrationRequest = Request<{}, {}, IRequestQueryRegistration, {}>
