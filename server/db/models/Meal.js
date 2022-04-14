const { Sequelize, DataTypes } = require('sequelize');
const db = require('../db');

const Meal = db.define(
  'meal',
  {
    category: {
      type: DataTypes.ENUM('breakfast', 'lunch', 'dinner'),
    },
  },
  { timestamps: false }
);

module.exports = Meal;
