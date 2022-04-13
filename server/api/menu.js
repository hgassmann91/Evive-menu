const router = require('express').Router();
const Menu = require('../db/models/Menu');

router.get('/', async (req, res, next) => {
  try {
    const menu = await Menu.findAll();
    res.send(menu);
    if (!menu) {
      res.status(404).send('There are no menu items to show');
    }
  } catch (error) {
    console.error('No menus found');
  }
});

module.exports = router;
