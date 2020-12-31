const knex = require('knex');

const config = {
  development: {
    client: 'pg',
    connection: {
      host: process.env.POSTGRES_HOST,
      port: process.env.POSTGRES_PORT,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
    },
  },

  production: {
    client: 'pg',
    connection: process.env.POSTGRES_URL,
  },
};

const pg = knex(
  process.env.NODE_ENV === 'prouduction'
    ? config.production
    : config.development
);

module.exports = pg;
