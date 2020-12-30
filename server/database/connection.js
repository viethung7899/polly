const knex = require('knex');

const pg = knex({
  client: 'pg',
  connection: {
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
    database: 'polly',
  },
});

module.exports = pg;
