import { Router } from 'express'
import userRouter from './userRouter.js'
import productRouter from './productRouter.js'
import categoryRouter from './categoryRouter.js'
import cartRouter from './cartRouter.js'
import colorRouter from './colorRouter.js'
import brandRouter from './brandRouter.js'

const router = Router()

router.use('/user', userRouter)
router.use('/product', productRouter)
router.use('/category', categoryRouter)
router.use('/brand', brandRouter)
router.use('/cart', cartRouter)
router.use('/color', colorRouter)

export default router
