import { Router } from 'express'
import categoryController from '../controllers/categoryController.js'
import checkRoleMiddleware from '../middlewares/CheckRoleMiddleware.js'

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), categoryController.create)
router.get('/', categoryController.getAll)

export default router
