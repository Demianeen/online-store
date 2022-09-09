import { Brand } from './Brand.js'
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes, NonAttribute, HasManyGetAssociationsMixin, HasManyAddAssociationMixin, HasManyAddAssociationsMixin, HasManyCountAssociationsMixin, HasManyCreateAssociationMixin, HasManyHasAssociationMixin, HasManyHasAssociationsMixin, HasManyRemoveAssociationMixin, HasManyRemoveAssociationsMixin, HasManySetAssociationsMixin } from 'sequelize'
import sequelize from '../../db.js'
import { Category } from './Category.js'
import { Color } from './Color.js'
import { ProductsColors } from './ProductsColors.js'

export class Product extends Model<InferAttributes<Product>, InferCreationAttributes<Product>> {
  declare id: CreationOptional<number>

  declare description: string
  declare price: number
  declare gender: string

  declare images: string

  declare Colors: NonAttribute<Color[]>

  declare getColors: HasManyGetAssociationsMixin<Color> // Note the null assertions!
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

Color.belongsToMany(Product, { through: ProductsColors, as: 'Products' })
Product.belongsToMany(Color, { through: ProductsColors, as: 'Colors' })

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)
