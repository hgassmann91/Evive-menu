const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Menu = db.define(
  'menu',
  {
    itemNumber: {
      type: DataTypes.INTEGER,
    },
    food: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: DataTypes.ENUM('main', 'side', 'drink', 'dessert'),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    meal: {
      type: DataTypes.ENUM('breakfast', 'lunch', 'dinner'),
    },
  },
  {
    uniqueKeys: {
      actions_unique: {
        fields: ['itemNumber', 'meal'],
      },
    },
    timestamps: false,
  }
);

module.exports = Menu;
