const { db } = require('./db');
const PORT = 8080;
const app = require('./app');
const seed = require('../script/seed');

const init = async () => {
  try {
    await db.sync();
    // start listening (and create a 'server' object representing our server)
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
  } catch (ex) {
    console.log(ex);
  }
};

init();
