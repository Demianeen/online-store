import { Router } from 'express'
import typeController from '../controllers/typeController.js'
import checkRoleMiddleware from '../middlewares/CheckRoleMiddleware.js'

const router = Router()

router.post('/', checkRoleMiddleware('ADMIN'), typeController.create)
router.get('/', typeController.getAll)

export default router
