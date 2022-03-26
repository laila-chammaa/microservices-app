const createKnexClient = require('./knex-client');
const createPostgresClient = require('./postgres-client');
const createMessageStore = require('./message-store');

const createHomeApp = require('./app/home');
const createRecordViewings = require('./app/record-viewings');

const createHomePageAggregator = require('./aggregators/home-page');

// creates the db clients + message store using the env vars then creates any apps needed
function createConfig({ env }) {
  const knexClient = createKnexClient({
    connectionString: env.databaseUrl,
  });

  const postgresClient = createPostgresClient({
    connectionString: env.messageStoreConnectionString,
  });

  const messageStore = createMessageStore({ db: postgresClient });

  const homeApp = createHomeApp({ db: knexClient });
  const recordViewingsApp = createRecordViewings({ messageStore });

  const homePageAggregator = createHomePageAggregator({
    db: knexClient,
    messageStore,
  });
  const aggregators = [homePageAggregator];
  const components = [];

  return {
    homeApp,
    recordViewingsApp,
    messageStore,
    aggregators,
    components,
  };
}

module.exports = createConfig;
