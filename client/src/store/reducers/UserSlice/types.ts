export interface IUserJWT {
  id: number
  email: string
  role: string
  CartId: number
}

export interface IUserState {
  isAuth: boolean
  user?: IUserJWT
}
