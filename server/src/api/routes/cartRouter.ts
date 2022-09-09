import { Router } from 'express'
import cartController from '../controllers/cartController.js'
import authMiddleware from '../middlewares/AuthMiddleware.js'

const router = Router()

router.post('/', cartController.create)
router.post('/item', authMiddleware, cartController.addItem)
router.get('/', authMiddleware, cartController.get)

export default router
