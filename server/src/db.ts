import { Sequelize } from 'sequelize'
import * as dotenv from 'dotenv'

dotenv.config()

const PORT = parseInt(process.env.DB_PORT)

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: PORT
  }
)

export default sequelize
