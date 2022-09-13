import { Brand } from './api/models/Brand.js'
import { Cart } from './api/models/Cart.js'
import { CartItem } from './api/models/CartItem.js'
import { Category } from './api/models/Category.js'
import { Color } from './api/models/Color.js'
import { Product } from './api/models/Product.js'
import { ProductsColors } from './api/models/ProductsColors.js'
import { User } from './api/models/User.js'

const setAssociations = (): void => {
  User.hasOne(Cart)
  Cart.belongsTo(User)

  // TODO: add associations as Products
  Product.hasMany(CartItem)
  CartItem.belongsTo(Product)

  Cart.hasMany(CartItem, { as: 'Items' })
  CartItem.belongsTo(Cart)

  Color.belongsToMany(Product, { through: ProductsColors, as: 'Products' })
  Product.belongsToMany(Color, { through: ProductsColors, as: 'Colors' })

  Category.hasMany(Product)
  Product.belongsTo(Category)

  Brand.hasMany(Product)
  Product.belongsTo(Brand)
}

export default setAssociations
