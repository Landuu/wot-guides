/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('tanks', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('short_name').notNullable();
    table.mediumint('wot_tank_id').unique().unsigned().notNullable();
    table.tinyint('tier').unsigned().notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('tanks');
};
