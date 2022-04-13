const router = require('express').Router();
const Order = require('../db/models/order');

router.get('/', async (req, res, next) => {
  try {
    const order = await Order.findAll();
    res.send(order);
    if (!order) {
      res.status(404).send('There are no orders to show');
    }
  } catch (error) {
    console.error('No orders found');
  }
});

module.exports = router;
