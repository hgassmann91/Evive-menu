const db = require('./db');
const Meal = require('./models/Meal');
const Menu = require('./models/Menu');
const Order = require('./models/Order');

Meal.belongsToMany(Menu, { through: Order });
Meal.hasOne(Menu);

module.exports = {
  db,
  models: {
    Order,
    Meal,
    Menu,
  },
};
