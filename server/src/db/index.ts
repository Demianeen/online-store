import fs from 'fs'
import path from 'path'
import { Sequelize } from 'sequelize'
import configs from './config/config.js'

const basename = path.basename(__filename)

const env = process.env.NODE_ENV ?? 'development'
if (env !== 'development') {
  throw new Error('Invalid environment value')
}

const config = configs[env]
if (config.dialect !== 'mysql' && config.dialect !== 'postgres' &&
  config.dialect !== 'sqlite' && config.dialect !== 'mariadb' &&
  config.dialect !== 'mssql' && config.dialect !== 'db2' &&
  config.dialect !== 'snowflake') {
  throw new Error('Invalid dialect value')
}

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  dialect: config.dialect
})

// TODO: Add typing
const db: Record<string, any> = {
  sequelize,
  Sequelize
}

const modelsPath = path.resolve('..', 'api', 'models')
fs
  .readdirSync(modelsPath)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(async (file) => {
    const model = await import(file)

    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

export default db
