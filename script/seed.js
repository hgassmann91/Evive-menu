'use strict';

const {
  db,
  models: { Menu },
} = require('../server/db');

async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  const menus = [
    {
      itemNumber: 1,
      food: 'Eggs',
      type: 'main',
      meal: 'breakfast',
    },
    {
      itemNumber: 2,
      food: 'Toast',
      type: 'side',
      meal: 'breakfast',
    },
    {
      itemNumber: 3,
      food: 'Coffee',
      type: 'drink',
      meal: 'breakfast',
    },
    {
      itemNumber: 1,
      food: 'Sandwich',
      type: 'main',
      meal: 'lunch',
    },
    {
      itemNumber: 2,
      food: 'Chips',
      type: 'side',
      meal: 'lunch',
    },
    {
      itemNumber: 3,
      food: 'Soda',
      type: 'drink',
      meal: 'lunch',
    },
    {
      itemNumber: 1,
      food: 'Steak',
      type: 'main',
      meal: 'dinner',
    },
    {
      itemNumber: 2,
      food: 'Potatoes',
      type: 'side',
      meal: 'dinner',
    },
    {
      itemNumber: 3,
      food: 'Wine',
      type: 'drink',
      meal: 'dinner',
    },
    {
      itemNumber: 4,
      food: 'Cake',
      type: 'dessert',
      meal: 'dinner',
    },
    {
      itemNumber: 5,
      food: 'Water',
      type: 'drink',
      meal: 'dinner',
    },
  ];

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

if (module === require.main) {
  runSeed();
}

module.exports = seed;
