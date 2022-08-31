import { NextFunction, Request, Response } from 'express'
import { deviceRequestCreate, deviceRequestGetMany, IDeviceInfo, IRequestParamsGetOne } from '../../types/controllers/deviceController.js'
import { v4 as uuidv4 } from 'uuid'
import ApiError from '../error/ApiError.js'
import path from 'path'
import { DeviceInfo, Device } from '../models/models.js'

class TypeController {
  async create (req: deviceRequestCreate, res: Response, next: NextFunction): Promise<void> {
    try {
      const { BrandId, TypeId, info, name, price } = req.body
      if (!BrandId) return next(ApiError.internal('BrandId is required'))
      if (!TypeId) return next(ApiError.internal('TypeId is required'))
      if (!name) return next(ApiError.internal('Name is required'))
      if (!price) return next(ApiError.internal('Price is required'))

      if (!req.files) return next(ApiError.internal('Image is not uploaded'))
      const { img } = req.files

      if (Array.isArray(img)) {
        // TODO: Add possibility to add multiple pictures
        return next(ApiError.internal('Uploading more than one image is not supported yet'))
      }

      // TODO: Remade with Multer
      const fileName = uuidv4() + '.jpg'
      img.mv(path.resolve('src/static/' + fileName))

      const newDevice = await Device.create({ name, price, TypeId, BrandId, img: fileName })

      let newInfo: IDeviceInfo[]
      if (info) {
        newInfo = JSON.parse(info)
        // we do not add await here, so our process won't wait for Device info to be created
        // eslint-disable-next-line
        newInfo.forEach(i =>
          DeviceInfo.create({
            title: i.title,
            desc: i.desc,
            DeviceId: newDevice.id
          })
        )
      }

      res.json(newDevice)
    } catch (error) {
      if (error instanceof Error || error instanceof ApiError) {
        next(ApiError.internal(error.message))
      }
      next(ApiError.internal(error as string))
    }
  }

  async getOne (req: Request, res: Response): Promise<void> {
    // TODO: Remove hardcode typing
    const { id } = req.params as IRequestParamsGetOne
    const device = await Device.findOne({
      where: { id },
      include: [{ model: DeviceInfo, as: 'info' }]
    })
    res.json(device)
  }

  async getAll (req: deviceRequestGetMany, res: Response): Promise<void> {
    const { BrandId, TypeId, limit = 9, page = 1 } = req.query
    const offset = page * limit - limit
    let device
    if (!BrandId && !TypeId) {
      device = await Device.findAndCountAll({ limit, offset })
    } else if (!BrandId && TypeId) {
      device = await Device.findAndCountAll({ where: { TypeId }, limit, offset })
    } else if (BrandId && !TypeId) {
      device = await Device.findAndCountAll({ where: { BrandId }, limit, offset })
    } else if (BrandId && TypeId) {
      device = await Device.findAndCountAll({ where: { TypeId, BrandId }, limit, offset })
    }

    res.json(device)
  }
}

export default new TypeController()
