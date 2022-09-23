import { Brand } from './Brand.js'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes, NonAttribute, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin } from 'sequelize'
import sequelize from '../../db.js'
import { Category } from './Category.js'
import { Color } from './Color.js'

export class Product extends Model<InferAttributes<Product, { omit: 'Colors' }>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>

  declare description: string
  declare price: number
  declare gender: string

  declare images: string

  // because we can get this attribute only if we explicitly include it in get
  declare Colors: NonAttribute<Color[]>

  // These functions automatically created with many to many associations
  declare getColors: HasManyGetAssociationsMixin<Color>
  declare addColor: HasManyAddAssociationMixin<Color, number>
  declare addColors: HasManyAddAssociationsMixin<Color, number>
  declare setColors: HasManySetAssociationsMixin<Color, number>
  declare removeColor: HasManyRemoveAssociationMixin<Color, number>
  declare removeColors: HasManyRemoveAssociationsMixin<Color, number>
  declare hasColor: HasManyHasAssociationMixin<Color, number>
  declare hasColors: HasManyHasAssociationsMixin<Color, number>
  declare countColors: HasManyCountAssociationsMixin
  declare createColor: HasManyCreateAssociationMixin<Color>

  declare CategoryId: ForeignKey<Category['id']>
  declare BrandId: ForeignKey<Brand['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: 0
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false
    },
    images: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'products'
  }
)
