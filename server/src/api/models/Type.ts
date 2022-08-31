import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import { Brand } from './Brand.js'
import { Device } from './Device.js'
import { TypeBrand } from './TypeBrand.js'

export class Type extends Model<InferAttributes<Type>, InferCreationAttributes<Type>> {
  declare id: CreationOptional<number>

  declare name: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Type.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'types'
  }
)

Type.hasMany(Device)
Device.belongsTo(Type)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })
