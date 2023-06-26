import express from 'express'
import { Error } from 'sequelize'
import sequelize from './db.js'
import router from './api/routes/index.js'
import errorHandlerMiddleware from './api/middlewares/ErrorHandlingMiddleware.js'
import * as dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'
import path from 'path'
import fs from 'fs'
import setAssociations from './associations.js'
import http from 'http'
import https from 'https'

dotenv.config()

const PORT = process.env.PORT || 4000
const HTTPS_PORT = process.env.HTTPS_PORT || 4443

const app = express()

const allowedOrigins = [
  'http://localhost',
  'http://localhost:3000',
  'http://4ajq.l.time4vps.cloud',
  'http://mybrandview.co.uk',
  'https://www.mybrandview.co.uk:444/',
  'https://mybrandview.co.uk:444/',
  'http://store.mybrandview.co.uk/',
  'https://store.mybrandview.co.uk/',
]
const corsOptions: cors.CorsOptions = {
  origin: '*',
  credentials: true
}

app.set('trust proxy', 1)
app.use(cors(corsOptions))
app.use(
  cors(),
  express.json(),
  fileUpload(),
  express.static(path.resolve('src/static'))
)
app.use('/api', router)
// error handler always is in the end
app.use(errorHandlerMiddleware)

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve('../../client/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../../client/build', 'index.html'))
  })
}

const privateKey = fs.readFileSync('/etc/letsencrypt/live/store.mybrandview.co.uk/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/store.mybrandview.co.uk/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/store.mybrandview.co.uk/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

const start = async (): Promise<void> => {
  try {
    await sequelize.authenticate()
    setAssociations()
    await sequelize.sync()
    
    httpServer.listen(PORT, () => console.log(`https server listening on ${PORT} port`))
    httpsServer.listen(HTTPS_PORT, () => console.log(`https server listening on ${HTTPS_PORT} port`))
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
    }
  }
}

start()
