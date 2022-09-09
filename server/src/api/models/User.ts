import { Model, InferAttributes, InferCreationAttributes, CreationOptional, DataTypes } from 'sequelize'
import sequelize from '../../db.js'
import bcrypt from 'bcrypt'

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>

  declare email: string
  declare password: string
  declare role: CreationOptional<'USER' | 'ADMIN'>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      type: new DataTypes.STRING(),
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      async set (val: string) {
        return await bcrypt.hash(val, 5)
      }
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: 'USER'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'users'
  }
)
