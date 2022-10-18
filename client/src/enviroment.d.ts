declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly REACT_APP_API_URL: string
      readonly REACT_APP_CURRENCY_API_URL: string
      readonly REACT_APP_CURRENCY_APIKEY: string
    }
  }
}

export { }
