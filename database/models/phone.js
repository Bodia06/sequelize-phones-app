'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Phone extends Model {
    static associate (models) {}
  }
  Phone.init(
    {
      model: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\-]+$/,
          min: 10,
          max: 64,
        },
      },
      brand: {
        type: DataTypes.STRING(64),
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\-]+$/,
          min: 3,
          max: 64,
        },
      },
      year: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        validate: {
          isDate: true,
          isBefore: new Date().toISOString().split('T')[0],
        },
      },
      ram: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 1024,
        },
      },
      processor: {
        type: DataTypes.STRING(25),
        allowNull: false,
        validate: {
          is: /^[A-Za-z0-9\-]+$/,
          min: 5,
          max: 25,
        },
      },
      screenSize: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
          min: 3.0,
          max: 10.0,
        },
      },
      hasNfc: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: 'Phone',
      underscored: true,
    }
  );
  return Phone;
};
