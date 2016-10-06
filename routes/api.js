module.exports = function (pool) {
  if (!pool || typeof pool !== 'object') {
    console.log('No Connection Pool Provided');
    return null;
  }

  var app = require('express').Router();
  var timezone = 'America/Los_Angeles';
  var dev = require('./dev')(pool, timezone);
  var cobrand = require('./cobrand')(pool, timezone);

  app.use(require('body-parser').urlencoded({extended: false}));

  app.use('/dev', dev);
  app.use('/cobrand', cobrand);

  return app;
};
