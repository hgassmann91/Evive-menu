const router = require('express').Router();
const Meal = require('../db/models/meal');

router.get('/', async (req, res, next) => {
  try {
    const meal = await Meal.findAll();
    res.send(meal);
    if (!meal) {
      res.status(404).send('There are no meals to show');
    }
  } catch (error) {
    console.error('No meals found');
  }
});

module.exports = router;
