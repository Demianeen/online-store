import { Admin } from './pages/Admin'
import Auth from './pages/Auth'
import Basket from './pages/Basket'
import DevicePage from './pages/DevicePage'
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
    path: Routes.BASKET_ROUTE,
    Component: Basket
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
    path: Routes.DEVICE_ROUTE + '/:id',
    Component: DevicePage
  }
]
