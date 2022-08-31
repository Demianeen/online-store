// TODO: Make right file structure for models
import { Model, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, DataTypes } from 'sequelize'
import sequelize from '../../db.js'

export class Basket extends Model<InferAttributes<Basket>, InferCreationAttributes<Basket>> {
  declare id: CreationOptional<number>

  declare UserId: ForeignKey<User['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Basket.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'baskets'
  }
)

export class BasketDevice extends Model<InferAttributes<BasketDevice>, InferCreationAttributes<BasketDevice>> {
  declare id: CreationOptional<number>

  declare BasketId: ForeignKey<Basket['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

BasketDevice.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'basket_devices'
  }
)

export class Brand extends Model<InferAttributes<Brand>, InferCreationAttributes<Brand>> {
  declare id: CreationOptional<number>

  declare name: string

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Brand.init(
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
    tableName: 'brands'
  }
)

export class Device extends Model<InferAttributes<Device>, InferCreationAttributes<Device>> {
  declare id: CreationOptional<number>

  declare name: string
  declare price: number
  declare rating: CreationOptional<number>
  declare img: string

  declare TypeId: ForeignKey<Type['id']>
  declare BrandId: ForeignKey<Brand['id']>

  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}

Device.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    rating: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    img: {
      type: DataTypes.STRING,
      allowNull: false
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    tableName: 'devices'
  }
)

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
      type: DataTypes.INTEGER.UNSIGNED,
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

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>

  declare email: string
  declare password: string
  declare role: CreationOptional<string>

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
      type: DataTypes.STRING
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

User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)

Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, { as: 'info' })
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, { through: TypeBrand })
Brand.belongsToMany(Type, { through: TypeBrand })
