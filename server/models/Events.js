const knex = require('../db/knex');


class Event {
  static async list() {
   try {
    const query = `SELECT * FROM run_events`;
    const result = await knex.raw(query);
    console.log(result.rows)
   } catch (error){
    throw new Error(`Unable to get events: ${error.message}`)
   }
  }

  // Fetches A single event from the run_events table that matches
  // the given event id. If it finds an event, uses the constructor
  // to format the event and returns or returns null if not.
  static async find(id) {
   try{
    const query = `SELECT * FROM run_events WHERE id = ?`;
    const {rows:[eventData]} = await knex.raw(query, [id]);
    return eventData
   } catch (error){
    throw new Error(`Unable to get event: ${error.message}`)
   } 
  }

  // Same as above but uses the name to find the event
  static async findByCreatedBy(name) {
   try {
    const query = `SELECT * FROM users WHERE event_created_by = ?`;
    const {rows:[eventData]} = await knex.raw(query, [name]);
    return eventData
   } catch (error){
    throw new Error(`Unable to get event: ${error.message}`)
   } 
  }

  // Creates a new event in the run_events table. Returns the newly created event
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
   try {
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
    const {rows:[eventData]} = await knex.raw(query, [name, eventCreatedBy,startingPoint, endingPoint,distance,maxParticipants, id])
    return eventData ? new Event(eventData) : null;
   }  catch (error){
    throw new Error(`Unable to get event: ${error.message}`)
   } 
  };

  static async deleteAll() {
   try {
    return knex('run_events').del()
   }catch (error){
    throw new Error(`Unable to delete events: ${error.message}`)
   } 
    
  }

  static async delete(eventId, userId){
   if (!eventId ) {
    throw new Error('Invalid eventId ');
  }
  if(!userId){
   throw new Error('Invalid userId ');
 }
   try{
    await knex('event_participants').where('event_id', eventId).del()
    const query = `DELETE FROM run_events WHERE id = ? AND event_created_by=? 
     RETURNING *`;
    const {rows:[eventData]} = await knex.raw(query, [eventId, userId]);
    return eventData
   } catch (error){
    throw new Error(`Unable to delete event: ${error.message}`)
   }
  }
}

module.exports = Event;