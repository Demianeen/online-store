import jwt from 'jsonwebtoken'

export interface UserIDJwtPayload extends jwt.JwtPayload {
  id: number
  email: string
  role: 'USER' | 'ADMIN'
}
