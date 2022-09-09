import { Router } from 'express'
import productController from '../controllers/productController.js'
import checkRoleMiddleware from '../middlewares/CheckRoleMiddleware.js'

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), productController.create)
router.get('/', productController.getAll)
router.get('/:id', productController.getOne)

export default router
