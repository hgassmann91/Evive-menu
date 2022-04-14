const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Input = db.define(
  'order',
  {
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
  },
  { timestamps: false }
);

module.exports = Input;
