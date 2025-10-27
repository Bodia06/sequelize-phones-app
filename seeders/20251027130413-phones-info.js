'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const date = new Date();
    await queryInterface.bulkInsert(
      'Phones',
      [
        {
          model: 'Galaxy S25',
          brand: 'Samsung',
          year: '2022-01-01',
          ram: 12,
          processor: 'Snapdragon 8 Gen 3',
          screen_size: 6.8,
          createdAt: date,
          updatedAt: date,
        },
        {
          model: 'iPhone 16',
          brand: 'Apple',
          year: '2023-01-01',
          ram: 8,
          processor: 'A18 Bionic',
          screen_size: 6.7,
          has_nfc: false,
          createdAt: date,
          updatedAt: date,
        },
        {
          model: 'Pixel 9',
          brand: 'Google',
          year: '2024-01-01',
          ram: 8,
          processor: 'Google Tensor G3',
          screen_size: 6.4,
          has_nfc: true,
          createdAt: date,
          updatedAt: date,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Phones', null, {});
  },
};
