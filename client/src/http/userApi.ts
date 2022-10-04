import { IUserJWT } from './../store/reducers/UserSlice/types'
import jwtDecode from 'jwt-decode'
import { $authHost, $host } from './index2'

export const registration = async (email: string, password: string) => {
  const { data } = await $host.post<string>(
    'api/user/registration',
    { email, password }
  )

  localStorage.setItem('token', data)
  return jwtDecode<IUserJWT>(data)
}

export const login = async (email: string, password: string) => {
  const { data } = await $host.post<string>(
    'api/user/login',
    { email, password }
  )

  localStorage.setItem('token', data)
  return jwtDecode<IUserJWT>(data)
}

export const check = async () => {
  const { data } = await $authHost.get<string | undefined>(
    'api/user/auth'
  )
  if (data !== undefined) {
    localStorage.setItem('token', data)
    return jwtDecode<IUserJWT>(data)
  }
}
