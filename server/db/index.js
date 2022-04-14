const db = require('./db');
const Meal = require('./models/Meal');
const Menu = require('./models/Menu');
const Order = require('./models/Order');
const BreakfastOrder = require('./models/BreakfastOrder');
const LunchOrder = require('./models/LunchOrder');
const DinnerOrder = require('./models/DinnerOrder');

Meal.belongsToMany(Menu, { through: Order });
Meal.hasOne(Menu);

module.exports = {
  db,
  models: {
    Order,
    Meal,
    Menu,
    BreakfastOrder,
    LunchOrder,
    DinnerOrder,
  },
};
