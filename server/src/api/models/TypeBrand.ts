import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import { Brand } from './Brand.js'
import { Type } from './Type.js'

export class TypeBrand extends Model<InferAttributes<TypeBrand>, InferCreationAttributes<TypeBrand>> {
  declare id: CreationOptional<number>

  declare TypeId: ForeignKey<Type['id']>
  declare BrandId: ForeignKey<Brand['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

TypeBrand.init(
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
    tableName: 'type_brands'
  }
)
