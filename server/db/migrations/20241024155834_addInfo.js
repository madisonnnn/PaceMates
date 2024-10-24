/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
 return knex.schema.alterTable('run_events', (table) => {
  table.string('time').notNullable()
  table.string('location').notNullable()
 })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.alterTable('run_events', (table) => {
  table.dropColumn('time')
  table.dropColumn('location')
})
};
