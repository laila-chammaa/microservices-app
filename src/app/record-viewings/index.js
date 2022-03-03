const express = require('express');

function createActions({ db }) {
  function recordViewing(traceId, videoId) {
    // no need to actually increment views right now
    // incrementing views thro the db creates a huge loss of data
    return true;
  }
  return {
    recordViewing,
  };
}

function createHandlers({ actions }) {
  function handleRecordViewing(req, res) {
    return actions
      .recordViewing(req.context.traceId, req.params.videoId)
      .then(() => res.redirect('/'));
  }
  return {
    handleRecordViewing,
  };
}

function createRecordViewings({ db }) {
  const actions = createActions({ db });
  const handlers = createHandlers({ actions });

  const router = express.Router();

  router.route('/:videoId').post(handlers.handleRecordViewing);

  return { actions, handlers, router };
}

module.exports = createRecordViewings;
