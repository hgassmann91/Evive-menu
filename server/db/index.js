const db = require('./db');
const Menu = require('./models/Menu');
const BreakfastOrder = require('./models/BreakfastOrder');
const LunchOrder = require('./models/LunchOrder');
const DinnerOrder = require('./models/DinnerOrder');

module.exports = {
  db,
  models: {
    Menu,
    BreakfastOrder,
    LunchOrder,
    DinnerOrder,
  },
};
