import { User } from '../api/models/User.js'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export {}
