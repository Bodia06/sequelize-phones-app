'use strict';
const { Model } = require('sequelize');
const { STATUS_PREORDERS } = require('../../constants');

module.exports = (sequelize, DataTypes) => {
  class Preorders extends Model {
    static associate (models) {
      Preorders.belongsTo(models.Phone, {
        foreignKey: 'phoneId',
      });
    }
  }
  Preorders.init(
    {
      dateOrder: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
      },
      status: {
        type: DataTypes.ENUM(...STATUS_PREORDERS),
        defaultValue: 'pending',
      },
      countPhones: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: true,
          min: 1,
          max: 100,
        },
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: false,
        validate: {
          is: /^[+]?[0-9\s\-()]{7,20}$/i,
        },
      },
      phoneId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Phones',
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'Preorders',
      underscored: true,
    }
  );
  return Preorders;
};
