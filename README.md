# Evive Menu Coding Assessment

This application is built as a system that takes orders for breakfast, lunch, and dinner.

Writen in JavaScript. Insomnia was used to test outside of the test scripts locally. Requests were sent as plain text to match the inputs in the prompt.

Created as an alternative to the get route, more accurately reflects sending the order to the DB after it has been verified instead of just returned as text.

## Dependencies

- "chai-as-promised": "^7.1.1",
- "express": "^4.17.3",
- "morgan": "^1.10.0",
- "node": "^17.4.0",
- "pg": "^8.7.3",
- "pg-hstore": "^2.3.4",
- "sequelize": "^6.18.0"

## devDependencies

- "chai": "^4.3.6",
- "mocha": "^9.2.2",
- "supertest": "^6.2.2"

## Steps to run files

(from the terminal / scripts set up for your convenience)

<!-- create db -->

1. createDb evive

<!-- install dependencies -->

2. npm install

<!-- seed the database) -->

3. npm run seed

<!-- start the server / listening on localhost:8080 -->

4. npm run start

<!-- run the tests, tests:dev allows for matching the tests for changes over just using test -->

5. npm run test:dev
