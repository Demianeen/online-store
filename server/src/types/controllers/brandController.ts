import { Request } from 'express'
import { InferCreationAttributes } from 'sequelize'
import { Brand } from '../../api/models/Brand.js'
import { CreationAttributes } from './index.js'

type RequestBody = CreationAttributes<InferCreationAttributes<Brand>>

export type brandRequest = Request<{}, {}, RequestBody, {}>
