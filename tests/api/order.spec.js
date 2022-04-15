const chai = require('chai');
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');

const app = require('supertest')(require('../../server/app.js'));
const {
  db,
  models: { Menu },
} = require('../../server/db');

chai.use(chaiAsPromised);

describe('Order routes', function () {
  beforeEach(async () => {
    await db.sync({ force: true });
    const menu = [
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
      menu.map((menu) => {
        return Menu.create(menu);
      })
    );
  });

  //Testing for errors associated with breakfast orders
  describe('Breakfast Errors', function () {
    it('GET responds with an error if only a meal is entered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Breakfast');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal(
        'Unable to process: Main is missing, side is missing'
      );
    });
    it('GET responds with an error if a side is missing', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Breakfast 1');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal('Unable to process: Side is missing');
    });
    it('GET responds with an error if multiple mains are entered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Breakfast 1,1,2,3');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal(
        'Unable to process: Eggs cannot be ordered more than once'
      );
    });
  });

  //Testing for errors associated with Lunch orders
  describe('Lunch Errors', function () {
    it('GET responds with an error if only a meal is entered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Lunch');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal(
        'Unable to process: Main is missing, side is missing'
      );
    });

    it('GET responds with an error if a side is missing', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Lunch 1');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal('Unable to process: Side is missing');
    });
    it('GET responds with an error if multiple mains are entered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Lunch 1,1,2,3');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal(
        'Unable to process: Sandwich cannot be ordered more than once'
      );
    });
  });

  //Testing for errors associated with Dinner orders
  describe('Dinner Errors', function () {
    it('GET responds with an error if only a meal is entered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Dinner');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal(
        'Unable to process: Main is missing, side is missing, dessert is missing'
      );
    });

    it('GET responds with an error if a side is missing', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Dinner 1,3,4');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal('Unable to process: Side is missing');
    });
    it('GET responds with an error if multiple mains are entered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Dinner 1,1,2,3,4');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal(
        'Unable to process: Steak cannot be ordered more than once'
      );
    });
    it('GET responds with an error if no dessert is ordered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Dinner 1,2,3');
      expect(response.status).to.equal(400);
      expect(response.text).to.equal('Unable to process: Dessert is missing');
    });
  });

  //Testing for expected output of correct breakfast orders
  describe('Breakfast Passing Tests', function () {
    it('GET responds with ordered foods', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Breakfast 1,2,3');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Eggs, Toast, Coffee');
    });
    it('GET responds with multiple coffees if ordered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Breakfast 1,2,3,3,3');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Eggs, Toast, Coffee(3)');
    });
    it('GET responds with with multiple sides if ordered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Breakfast 1,2,2,3');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Eggs, Toast(2), Coffee');
    });
  });

  //Testing for expected output of correct Lunch orders
  describe('Lunch Passing Tests', function () {
    it('GET responds with ordered foods', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Lunch 1,2,3');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Sandwich, Chips, Soda');
    });
    it('GET responds adds water if no drink is ordered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Lunch 1,2');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Sandwich, Chips, Water');
    });
    it('GET responds with with multiple sides if ordered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Lunch 1,2,2,3');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Sandwich, Chips(2), Soda');
    });
  });

  //Testing for expected output of correct Dinner orders
  describe('Dinner Passing Tests', function () {
    it('GET responds with ordered foods + water if not expressly ordered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Dinner 1,2,3,4');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Steak, Potatoes, Wine, Water, Cake');
    });
    it('GET responds adds water if no drink is ordered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Dinner 1,2,4');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Steak, Potatoes, Water, Cake');
    });
    it('GET responds with with multiple sides if ordered', async () => {
      const response = await app
        .get('/api/order')
        .set({ 'Content-Type': 'text/plain' })
        .send('Dinner 1,2,2,3,4');
      expect(response.status).to.equal(200);
      expect(response.text).to.equal('Steak, Potatoes(2), Wine, Water, Cake');
    });
  });
});
