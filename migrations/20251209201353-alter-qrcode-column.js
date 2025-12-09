'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Altera a coluna 'qrcode' para TEXT
    await queryInterface.changeColumn('Tables', 'qrcode', {
      type: Sequelize.TEXT,
      allowNull: true, // mantém a possibilidade de ser nulo
    });
  },

  async down(queryInterface, Sequelize) {
    // Reverte a coluna para STRING
    await queryInterface.changeColumn('Tables', 'qrcode', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  }
};
