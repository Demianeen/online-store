import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import { Device } from './Device.js'
import { User } from './User.js'

export class Rating extends Model<InferAttributes<Rating>, InferCreationAttributes<Rating>> {
  declare id: CreationOptional<number>

  declare rating: number

  declare DeviceId: ForeignKey<Device['id']>
  declare UserId: ForeignKey<User['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Rating.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    rating: { type: DataTypes.INTEGER, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'ratings'
  }
)
