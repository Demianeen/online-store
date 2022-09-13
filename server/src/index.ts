import express from 'express'
import { Error } from 'sequelize'
import sequelize from './db.js'
import router from './api/routes/index.js'
import errorHandlerMiddleware from './api/middlewares/ErrorHandlingMiddleware.js'
import * as dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
import setAssociations from './associations.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()
app.use(
  cors(),
  express.json(),
  fileUpload(),
  express.static(path.resolve('src/static'))
)
app.use('/api', router)
// error handler always is in the end
app.use(errorHandlerMiddleware)

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    setAssociations()
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

start()
