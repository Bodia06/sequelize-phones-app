'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('phones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      model: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\-]+$/,
          min: 10,
          max: 64,
        },
      },
      brand: {
        type: Sequelize.STRING(64),
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\-]+$/,
          min: 3,
          max: 64,
        },
      },
      year: {
        type: Sequelize.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split('T')[0],
        },
      },
      ram: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 1024,
        },
      },
      processor: {
        type: Sequelize.STRING(25),
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\-]+$/,
          min: 5,
          max: 25,
        },
      },
      screen_size: {
        type: Sequelize.FLOAT,
        allowNull: false,
        validate: {
          min: 3.0,
          max: 10.0,
        },
      },
      has_nfc: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('phones');
  },
};
