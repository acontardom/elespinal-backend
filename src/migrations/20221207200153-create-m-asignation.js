'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MAsignations', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      init_date: {
        type: Sequelize.DATEONLY
      },
      finish_date: {
        type: Sequelize.DATEONLY
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      EquipmentId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Equipment',
          key: 'id'
        },
      },
      projectId: { 
        type: Sequelize.INTEGER,
        references: {
          model: 'Projects',
          key: 'id'
        },
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MAsignations');
  }
};