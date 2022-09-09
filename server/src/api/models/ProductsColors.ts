import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from 'sequelize'
import sequelize from '../../db.js'
import { Color } from './Color.js'
import { Product } from './Product.js'

export class ProductsColors extends Model<InferAttributes<ProductsColors>, InferCreationAttributes<ProductsColors>> {
  declare ProductId: ForeignKey<Product['id']>
  declare ColorId: ForeignKey<Color['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

ProductsColors.init({
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE
}, {
  sequelize,
  tableName: 'products_colors'
})
