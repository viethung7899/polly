const knex = require('knex');
const configs = require('../knexfile');

const config =
  process.env.NODE_ENV === 'production'
    ? configs.production
    : configs.development;

const pg = knex(config);

module.exports = pg;
