import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import { BasketDevice } from './BasketDevice.js'
import { User } from './User.js'

export class Basket extends Model<InferAttributes<Basket>, InferCreationAttributes<Basket>> {
  declare id: CreationOptional<number>

  declare UserId: ForeignKey<User['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Basket.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'baskets'
  }
)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)
