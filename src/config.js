const createKnexClient = require('./knex-client');
const createHomeApp = require('./app/home');
const createRecordViewings = require('./app/record-viewings');

function createConfig({ env }) {
  const db = createKnexClient({
    connectionString: env.databaseUrl,
  });
  const homeApp = createHomeApp({ db });
  const recordViewingsApp = createRecordViewings({ db });
  return {
    db,
    homeApp,
    recordViewingsApp,
  };
}

module.exports = createConfig;
