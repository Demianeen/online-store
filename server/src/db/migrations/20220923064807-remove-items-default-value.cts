import { QueryInterface } from 'sequelize'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.changeColumn('cart_items', 'size', {
      type: Sequelize.DataTypes.STRING,
      defaultValue: null,
      allowNull: false
    })
  },

  async down (queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.changeColumn('cart_items', 'size', {
      type: Sequelize.DataTypes.STRING,
      defaultValue: 'XS'
    })
  }
}
