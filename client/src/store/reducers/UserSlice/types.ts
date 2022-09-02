export interface IUser {
  id: number
  name: string
  price: number
  rating: number
  img: string
  TypeId: number
  BrandId: number
  createdAt: Date
  updatedAt: Date
}

export interface IUserState {
  isAuth: boolean
  user: Partial<IUser>
}
