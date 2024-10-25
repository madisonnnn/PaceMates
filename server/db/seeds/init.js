const User = require('../../models/User');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async (knex) => {
  // Before you have models you can always just do `await knex('table_name').del`
    
  // include time and location 

    await knex('event_participants').del()
    await knex('run_events').del()
    await knex('users').del();
  await knex.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1');

  // User.create(firstname,lastname,email, password)
  await User.create('madison','tolentino', '@gmail', '1234');
  await knex('users').insert([
    { first_name: 'andy',last_name: 'andy', email: 'andy', password_hash: 'andyPassword' },
    { first_name: 'bob', last_name: 'andy',email: 'bob',password_hash: 'bobPassword' },
    { first_name: 'candice',last_name: 'andy', email: 'candice',password_hash: 'candicePassword' }
  ])
  const [user] = await knex('users').select('id').limit(1)
  await knex('run_events').insert([
    { name: 'andy', date: '10/10/2024', time: '12:00 PM', location: 'Brooklyn', event_created_by: user.id, starting_point: 'marcy', ending_point: 'train', description: 'fun run', distance: 3.3, max_participants: 14 },
  ]);

  const [event] = await knex('run_events').select('id').limit(1)
  await knex('event_participants').insert([
    {event_id:event.id,user_id:user.id}
  ])
  // await knex('event_participants').where('event_id', user.id).del();


  // await knex('run_events').where('event_created_by', user.id).del();
  // await User.create('l33t-guy', '1234');
  // await User.create('wowow', '1234');
};
