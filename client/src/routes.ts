import { Admin } from './pages/Admin'
import Auth from './pages/Auth'
import Cart from './pages/Cart'
import DevicePage from './pages/ProductPage'
import Shop from './pages/Shop'
import { Routes } from './utils/consts'

interface IRoutes {
  path: string
  Component: () => JSX.Element
}

export const authRoutes: IRoutes[] = [
  {
    path: Routes.ADMIN_ROUTE,
    Component: Admin
  },
  {
    path: Routes.CART_ROUTE,
    Component: Cart
  }
]

export const publicRoutes: IRoutes[] = [
  {
    path: Routes.LOGIN_ROUTE,
    Component: Auth
  },
  {
    path: Routes.REGISTRATION_ROUTE,
    Component: Auth
  },
  {
    path: Routes.SHOP_ROUTE,
    Component: Shop
  },
  {
    path: Routes.PRODUCT_ROUTE + '/:id',
    Component: DevicePage
  }
]
