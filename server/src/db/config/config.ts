import * as dotenv from 'dotenv'
dotenv.config()

export default {
  development: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    dialect: 'postgres'
  }
}
