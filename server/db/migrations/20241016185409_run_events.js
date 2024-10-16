/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
 return knex.schema.createTable('run_events', (table) => {
  table.increments('id')
  table.string('name').notNullable()
  table.string('date').notNullable()
  table.integer('event_created_by').notNullable()
  table.string('starting_point').notNullable()
  table.string('ending_point').notNullable()
  table.string('description').notNullable()
  table.float('distance').notNullable()
  table.integer('max_participants')
  table.timestamps(true,true)
  
  table.foreign('event_created_by').references('id').inTable('users')
 })
 .createTable('event_participants', (table) => {
  table.timestamps(true, true)
  table.integer('user_id').notNullable()
  table.integer('event_id').notNullable()

  table.foreign('user_id').references('id').inTable('users')
  table.foreign('event_id').references('id').inTable('run_events')
 })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
 return knex.schema.dropTable('run_events').dropTable('event_participants')
};
