const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const DinnerOrder = db.define(
  'dinner_order',
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
    sideQty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    drink: {
      type: DataTypes.TEXT,
    },
    water: {
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
    dessert: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  { timestamps: false }
);

module.exports = DinnerOrder;
