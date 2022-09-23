'use strict'

import { QueryInterface } from 'sequelize'

module.exports = {
  async up (queryInterface: QueryInterface, Sequelize: any) {
    await queryInterface.addColumn(
      'products',
      'sizes',
      {
        type: Sequelize.DataTypes.STRING,
        defaultValue: JSON.stringify(['XS', 'S', 'M', 'L'])
      }
    )
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.removeColumn('products', 'sizes')
  }
}
