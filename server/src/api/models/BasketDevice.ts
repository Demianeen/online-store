import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import { Basket } from './Basket.js'

export class BasketDevice extends Model<InferAttributes<BasketDevice>, InferCreationAttributes<BasketDevice>> {
  declare id: CreationOptional<number>

  declare BasketId: ForeignKey<Basket['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

BasketDevice.init(
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
    tableName: 'basket_devices'
  }
)
