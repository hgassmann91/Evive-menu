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
      type: DataTypes.ENUM('main', 'side', 'drink', 'desert'),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    uniqueKeys: {
      actions_unique: {
        fields: ['itemNumber', 'mealId'],
      },
    },
    timestamps: false,
  }
);

module.exports = Menu;
