const createWrite = require('./write');

function createMessageStore({ db }) {
  const write = createWrite({ db });

  const createSubscription = () => {
    const start = () => {};
    return {
      start,
    };
  };
  return {
    write,
    createSubscription,
  };
}

module.exports = createMessageStore;
