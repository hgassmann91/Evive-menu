'use strict';

const {
  db,
  models: { Menu, Meal, Order },
} = require('../server/db');

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const meals = [
    {
      category: 'breakfast',
    },
    {
      category: 'lunch',
    },
    {
      category: 'dinner',
    },
  ];
  const menus = [
    {
      itemNumber: 1,
      food: 'Eggs',
      type: 'main',
      mealId: 1,
    },
    {
      itemNumber: 2,
      food: 'Toast',
      type: 'side',
      mealId: 1,
    },
    {
      itemNumber: 3,
      food: 'Coffee',
      type: 'drink',
      mealId: 1,
    },
    {
      itemNumber: 1,
      food: 'Sandwich',
      type: 'main',
      mealId: 2,
    },
    {
      itemNumber: 2,
      food: 'Chips',
      type: 'side',
      mealId: 2,
    },
    {
      itemNumber: 3,
      food: 'Soda',
      type: 'drink',
      mealId: 2,
    },
    {
      itemNumber: 1,
      food: 'Steak',
      type: 'main',
      mealId: 3,
    },
    {
      itemNumber: 2,
      food: 'Potatoes',
      type: 'side',
      mealId: 3,
    },
    {
      itemNumber: 3,
      food: 'Wine',
      type: 'drink',
      mealId: 3,
    },
    {
      itemNumber: 4,
      food: 'Cake',
      type: 'desert',
      mealId: 3,
    },
    {
      itemNumber: 5,
      food: 'Water',
      type: 'drink',
      mealId: 3,
    },
  ];

  await Promise.all(
    meals.map((category) => {
      return Meal.create(category);
    })
  );

  await Promise.all(
    menus.map((menu) => {
      return Menu.create(menu);
    })
  );
}

async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
