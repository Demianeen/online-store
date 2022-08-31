import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import { Device } from './Device.js'

export class DeviceInfo extends Model<InferAttributes<DeviceInfo>, InferCreationAttributes<DeviceInfo>> {
  declare id: CreationOptional<number>

  declare title: string
  declare desc: string

  declare DeviceId: ForeignKey<Device['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

DeviceInfo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    title: { type: DataTypes.STRING, allowNull: false },
    desc: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'device_infos'
  }
)
