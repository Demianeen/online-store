import { CartItem } from './CartItem.js'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes, NonAttribute } from 'sequelize'
import sequelize from '../../db.js'
import { User } from './User.js'

export class Cart extends Model<InferAttributes<Cart, { omit: 'Items' }>, InferCreationAttributes<Cart>> {
  declare id: CreationOptional<number>

  declare UserId: ForeignKey<User['id']>
  declare Items: NonAttribute<CartItem[]>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Cart.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'carts'
  }
)
