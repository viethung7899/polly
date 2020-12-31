const Knex = require('knex');

/**
 *
 * @param {Knex} knex
 */
exports.up = async (knex) => {
  await knex.schema.createTable('users', (table) => {
    table.increments('userID').primary();
    table.string('name').notNullable();
    table.string('username').notNullable();
    table.string('hashPassword').notNullable();
  });

  await knex.schema.createTable('polls', (table) => {
    table.increments('pollID').primary();
    table
      .integer('userID')
      .references('userID')
      .inTable('users')
      .notNullable()
      .onDelete('cascade');
    table.string('question').notNullable();
    table.timestamp('created').notNullable();
    table.timestamp('expired').notNullable();
  });

  await knex.schema.createTable('answers', (table) => {
    table.increments('answerID').primary();
    table
      .integer('pollID')
      .references('pollID')
      .inTable('polls')
      .notNullable()
      .onDelete('cascade');
    table.string('answer').notNullable();
    table.integer('count').defaultTo(0);
  });

  await knex.schema.createTable('votes', (table) => {
    table.increments('voteID').primary();
    table
      .integer('pollID')
      .references('pollID')
      .inTable('polls')
      .notNullable()
      .onDelete('cascade');
    table
      .integer('userID')
      .references('userID')
      .inTable('users')
      .notNullable()
      .onDelete('cascade');
  });
};

/**
 *
 * @param {Knex} knex
 */
exports.down = async (knex) => {
  await knex.schema.dropTable('votes');
  await knex.schema.dropTable('answers');
  await knex.schema.dropTable('polls');
  await knex.schema.dropTable('users');
};
