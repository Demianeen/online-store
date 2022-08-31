import { User } from '../api/models/models.js'

// declare namespace Express {
//   export interface Request {
//     user?: string | JwtPayload
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export {}
