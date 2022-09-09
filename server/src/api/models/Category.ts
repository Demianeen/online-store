import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'
import sequelize from '../../db.js'

export class Category extends Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
  declare id: CreationOptional<number>

  declare name: string
  declare gender: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Category.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'categories'
  }
)
