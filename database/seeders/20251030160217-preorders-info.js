'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const date = new Date();
    await queryInterface.bulkInsert(
      'preorders',
      [
        {
          date_order: '2025-01-10',
          count_phones: 2,
          phone_number: '+1-202-555-0143',
          phone_id: 6,
          created_at: date,
          updated_at: date,
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('preorders', null, {});
  },
};
