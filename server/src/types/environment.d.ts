declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly PORT: string
      readonly DB_HOST: string
      readonly DB_PORT: string
      readonly DB_USER: string
      readonly DB_PASS: string
      readonly DB_NAME: string
      readonly SECRET_KEY: string
    }
  }
}

export {}
