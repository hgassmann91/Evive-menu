const Sequelize = require('sequelize');

const db = new Sequelize(
  'postgres://localhost:5432/evive' || process.env.DATABASE_URL,
  {
    logging: false,
  }
);

module.exports = db;
