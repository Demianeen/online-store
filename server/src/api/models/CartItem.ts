import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import { Cart } from './Cart.js'
import { Product } from './Product.js'

export class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
  declare id: CreationOptional<number>

  declare quantity: CreationOptional<number>

  declare CartId: ForeignKey<Cart['id']>
  declare ProductId: ForeignKey<Product['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

CartItem.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'cart_items'
  }
)

Cart.hasMany(CartItem, { as: 'Items' })
CartItem.belongsTo(Cart)

Product.hasMany(CartItem)
CartItem.belongsTo(Product)
