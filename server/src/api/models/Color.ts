import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin, NonAttribute } from 'sequelize'
import sequelize from '../../db.js'
import { Product } from './Product.js'

export class Color extends Model<InferAttributes<Color, { omit: 'Devices' }>, InferCreationAttributes<Color>> {
  declare id: CreationOptional<number>

  declare hex: string

  // because we can get this attribute only if we explicitly include it in get
  declare Devices: NonAttribute<Product[]>

  // These functions automatically created with many to many associations
  declare getProducts: HasManyGetAssociationsMixin<Product>
  declare addProduct: HasManyAddAssociationMixin<Product, number>
  declare addProducts: HasManyAddAssociationsMixin<Product, number>
  declare setProducts: HasManySetAssociationsMixin<Product, number>
  declare removeProduct: HasManyRemoveAssociationMixin<Product, number>
  declare removeProducts: HasManyRemoveAssociationsMixin<Product, number>
  declare hasProduct: HasManyHasAssociationMixin<Product, number>
  declare hasProducts: HasManyHasAssociationsMixin<Product, number>
  declare countProducts: HasManyCountAssociationsMixin
  declare createProduct: HasManyCreateAssociationMixin<Product, 'CategoryId' | 'BrandId'>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Color.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    hex: { type: DataTypes.STRING, unique: true, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'colors'
  }
)
