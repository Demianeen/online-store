import { Router } from 'express'
import cartController from '../controllers/cartController.js'
import authMiddleware from '../middlewares/AuthMiddleware.js'

const router = Router()

router.post('/', cartController.create)
router.post('/item', authMiddleware, cartController.addItem)
router.post('/item/remove', authMiddleware, cartController.removeItems)
router.post('/item/quantity', cartController.changeItemQuantityBy)
router.post('/item/size', cartController.changeItemSize)
router.get('/item', authMiddleware, cartController.getCartItems)

export default router
