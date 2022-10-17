export interface IUserJWT {
  id: number
  email: string
  role: string
  CartId: number
}

export interface IRegisterBody {
  email: string
  password: string
}

export interface IUserApiState {
  user: IUserJWT
  token: string
}
