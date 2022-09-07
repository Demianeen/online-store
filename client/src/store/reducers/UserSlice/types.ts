export interface IUserJWT {
  id: number
  email: string
  role: string
}

export interface IUserState {
  isAuth: boolean
  user: Partial<IUserJWT>
}
