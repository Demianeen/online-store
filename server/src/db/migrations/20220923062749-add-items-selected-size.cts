import { QueryInterface } from 'sequelize'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.addColumn(
      'cart_items',
      'size',
      {
        type: Sequelize.DataTypes.STRING,
        defaultValue: 'XS'
      }
    )
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn('cart_items', 'size')
  }
}
