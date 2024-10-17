const knex = require('../db/knex');


class Event {


  // Fetches ALL users from the users table, uses the constructor
  // to format each user (and hide their password hash), and returns.
  static async list() {
    const query = `SELECT * FROM run_events`;
    const result = await knex.raw(query);
    console.log(result.rows)
    return result.rows
  }

  // Fetches A single event from the run_events table that matches
  // the given event id. If it finds an event, uses the constructor
  // to format the event and returns or returns null if not.
  static async find(id) {
    const query = `SELECT * FROM run_events WHERE id = ?`;
    const result = await knex.raw(query, [id]);
    const rawEventData = result.rows[0];
    return rawEventData
  }


  // Same as above but uses the name to find the event
  static async findByCreatedBy(name) {
    const query = `SELECT * FROM users WHERE event_created_by = ?`;
    const {rows:[eventData]} = await knex.raw(query, [name]);
    return eventData
  }

  // Creates a new event
  // in the run_events table. Returns the newly created event
  static async create(name,eventCreatedBy,date, startingPoint, endingPoint,description, distance,maxParticipants) {
    //console.log(name,eventCreatedBy,date, startingPoint, endingPoint,description, distance,maxParticipants)
    try{
    const query = `INSERT INTO run_events (name, event_created_by, date, starting_point, ending_point, description, distance, max_participants)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`;
    const {rows:[eventData]} = await knex.raw(query, [name, eventCreatedBy, date, startingPoint, endingPoint,description, distance,maxParticipants]);
    return eventData
   } catch (error){
    throw new Error(`Unable to create event: ${error.message}`)
   }
  }

  // Updates the event that matches the given id with new data.
  // Returns the modified event
  static async update(name, eventCreatedBy,startingPoint, endingPoint,distance,maxParticipants) {
    const query = `
      UPDATE run_events
      SET name=?
      SET event_created_by=?
      SET starting_point=?
      SET ending_point=?
      SET distance=?
      SET max_participants=?
      WHERE id=?
      RETURNING *
    `
    const result = await knex.raw(query, [name, eventCreatedBy,startingPoint, endingPoint,distance,maxParticipants, id])
    const rawUpdatedEvent = result.rows[0];
    return rawUpdatedEvent ? new Event(rawUpdatedEvent) : null;
  };

  static async deleteAll() {
    return knex('run_events').del()
  }
}

module.exports = Event;