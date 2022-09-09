import { Router } from 'express'
import colorController from '../controllers/colorController.js'
import checkRoleMiddleware from '../middlewares/CheckRoleMiddleware.js'

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), colorController.create)
router.get('/', colorController.getAll)

export default router
