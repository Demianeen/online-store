import { IUserJWT } from './../../store/reducers/UserSlice/types'
export interface IRegisterBody {
  email: string
  password: string
}

export interface IUserApiState {
  user: IUserJWT
  token: string
}
