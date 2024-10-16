/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 knex('users').del()
 return knex.schema.alterTable('users', (table) => {
  table.dropColumn('username');
  table.string('first_name').notNullable();
  table.string('last_name').notNullable();
  table.string('email').notNullable().unique();
})
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.alterTable('users', (table) => {
  table.dropColumn('first_name');
  table.dropColumn('last_name');
  table.dropColumn('email');
 });
};
