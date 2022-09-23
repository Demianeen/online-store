import { QueryInterface } from 'sequelize'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.addColumn(
      'products',
      'isInStock',
      {
        type: Sequelize.DataTypes.BOOLEAN,
        defaultValue: true
      }
    )
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn(
      'products',
      'isInStock'
    )
  }
}
