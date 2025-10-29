'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const date = new Date();
    await queryInterface.bulkInsert(
      'phones',
      [
        {
          model: 'Galaxy S25',
          brand: 'Samsung',
          year: '2022-01-01',
          ram: 12,
          processor: 'Snapdragon 8 Gen 3',
          screen_size: 6.8,
          has_nfc: Sequelize.literal('DEFAULT'),
          created_at: date,
          updated_at: date,
        },
        {
          model: 'iPhone 16',
          brand: 'Apple',
          year: '2023-01-01',
          ram: 8,
          processor: 'A18 Bionic',
          screen_size: 6.7,
          has_nfc: false,
          created_at: date,
          updated_at: date,
        },
        {
          model: 'Pixel 9',
          brand: 'Google',
          year: '2024-01-01',
          ram: 8,
          processor: 'Google Tensor G3',
          screen_size: 6.4,
          has_nfc: true,
          created_at: date,
          updated_at: date,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('phones', null, {});
  },
};
