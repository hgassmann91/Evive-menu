const router = require('express').Router();
const Menu = require('../db/models/menu');

router.get('/', async (req, res, next) => {
  try {
    //isolate text from request
    const text = req.body;
    //parse text in to the meal the order is for and the items being orded
    let meal =
      text.substring(0, text.indexOf(' ')).toLowerCase() || text.toLowerCase();
    let items = text
      .toLowerCase()
      .replace(`${meal} `, '')
      .trim()
      .toLowerCase()
      .split(',')
      .map((num) => {
        if (isNaN(Number(num))) {
          return;
        } else {
          return Number(num);
        }
      });

    //creates a easily search able map of the items ordered by the type of menu item
    //the mapped fields are returned as follows type {food: 'str', index: num, qty: num}
    const createMap = async () => {
      const orderMap = new Map();
      //map through the order input array, to create a hash map based on 'type' of menu item for the specified meal.

      if (items[0] === undefined) {
        items = [];
      }

      for (let i = 0; i < items.length; i++) {
        let item = items[i];

        let newItem = await Menu.findOne({
          where: { meal: meal, itemNumber: item },
        });

        //tests if the numbers ordered are present in the menu database
        if (!newItem) {
          orderMap.set(`unknown`, {
            food: 'unknown',
            index: i,
            qty: 1,
          });
          //edge case, not specified in the prompt, but a realistic scenario that someone orders a 2nd side that is different from the first side
        } else if (
          orderMap.get(newItem.type) &&
          orderMap.get(newItem.type).food !== newItem.food
        ) {
          orderMap.set(`${newItem.type}_${newItem.food}`, {
            food: newItem.food,
            index: i,
            qty: 1,
          });
          //increments the qty ordered if the same food type / food are the same
        } else if (orderMap.get(newItem.type)) {
          orderMap.get(newItem.type).qty++;
          //creates the new object present in the map
        } else {
          orderMap.set(`${newItem.type}`, {
            food: newItem.food,
            index: i,
            qty: 1,
          });
        }
      }

      return orderMap;
    };

    let orderTesting = await createMap();

    //error testing for the order
    const findErrors = () => {
      let errors = [];
      // if (items.length) {
      //   errors.push('Unable to process: Main is missing, side is missing')
      // }

      if (orderTesting) {
        // checks to make sure that each one is defined
        //[food, qty]
        let main = orderTesting.get('main')
          ? [orderTesting.get('main').food, orderTesting.get('main').qty]
          : undefined;
        let side = orderTesting.get('side')
          ? [orderTesting.get('side').food, orderTesting.get('side').qty]
          : undefined;
        let dessert = orderTesting.get('dessert')
          ? [orderTesting.get('dessert').food, orderTesting.get('dessert').qty]
          : undefined;
        let unknown = orderTesting.get('unknown')
          ? [orderTesting.get('unknown').food, orderTesting.get('unknown').qty]
          : undefined;

        if (!main) {
          errors.length
            ? errors.push(`main is missing`)
            : errors.push(`Unable to process: Main is missing`);
          //checks to make sure there are not multiple mains
        } else if (main[1] > 1) {
          errors.length
            ? errors.push(`${main[0]} cannot be ordered more than once`)
            : errors.push(
                `Unable to process: ${main[0]} cannot be ordered more than once`
              );
        }
        if (!side) {
          errors.length
            ? errors.push(`side is missing`)
            : errors.push(`Unable to process: Side is missing`);
        }
        //checks to make sure that dessert is defined for dinner
        if (!dessert && meal === 'dinner') {
          errors.length
            ? errors.push(`dessert is missing`)
            : errors.push(`Unable to process: Dessert is missing`);
        }

        if (unknown) {
          errors.length
            ? errors.push(`an unknown item was ordered`)
            : errors.push(`Unable to process: An unknown item was ordered`);
        }

        console.log(errors.join(', '));
      }
      return errors;
    };

    let errors = findErrors().join(', ');

    //creates text output for order
    const formulateOrder = () => {
      let orderText = '';
      let main = [orderTesting.get('main').food];

      let side = [orderTesting.get('side').food, orderTesting.get('side').qty];

      let drink = orderTesting.get('drink')
        ? [orderTesting.get('drink').food, orderTesting.get('drink').qty]
        : ['Water', 1];

      let mainText = `${main[0]}`;
      let sideText = side[1] > 1 ? `${side[0]}(${side[1]})` : `${side[0]}`;
      let drinkText = drink[1] > 1 ? `${drink[0]}(${drink[1]})` : `${drink[0]}`;
      let dessertText = '';

      if (meal === 'dinner') {
        let dessert = [
          orderTesting.get('dessert').food,
          orderTesting.get('dessert').qty,
        ];
        dessertText =
          dessert[1] > 1 ? `${dessert[0]}(${dessert[1]})` : `${dessert[0]}`;
        if (!drinkText.includes('Water')) {
          drinkText += ', Water';
        }
      }
      orderText =
        meal !== 'dinner'
          ? `${mainText}, ${sideText}, ${drinkText}`
          : `${mainText}, ${sideText}, ${drinkText}, ${dessertText}`;
      return orderText;
    };

    if (errors.length) {
      res.status(400).send(`${errors}`);
    } else {
      let orderText = formulateOrder();

      res.send(`${orderText}`);
    }
  } catch (error) {
    console.error('Cannot process request, unidentified error detected');
    res.send(
      `${error}: Cannot process request, unidentified error detected please review your input and try again`
    );
  }
});

module.exports = router;
