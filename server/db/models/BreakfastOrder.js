const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const BreakfastOrder = db.define(
  'breakfast_order',
  {
    main: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    side: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    drink: {
      type: DataTypes.TEXT,
      defaultValue: 'water',
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    drinkQty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

module.exports = BreakfastOrder;
