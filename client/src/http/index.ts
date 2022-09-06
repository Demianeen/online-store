import axios, { AxiosRequestConfig } from 'axios'

export const $host = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const $authHost = axios.create({
  baseURL: process.env.REACT_APP_API_URL
})

export const setAuthInterceptor = (config: AxiosRequestConfig<any>) => {
  const token = localStorage.getItem('token')
  if (token !== null && config.headers !== undefined) {
    config.headers.authorization = `Bearer ${token}`
    return config
  }
}

$authHost.interceptors.request.use(setAuthInterceptor)
