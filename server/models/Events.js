const knex = require('../db/knex');

class Event {
  static async list() {
   try {
    const query = `SELECT * FROM run_events`;
    const {rows} = await knex.raw(query);
    return rows
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
  static async create(name, eventCreatedBy, date, time, location, startingPoint, endingPoint, description, distance, maxParticipants) {
    //console.log(name,eventCreatedBy,date, startingPoint, endingPoint,description, distance,maxParticipants)
    console.log(name, eventCreatedBy, date, time, location, startingPoint, endingPoint, description, distance, maxParticipants)
    try{
    const query = `INSERT INTO run_events (name, event_created_by, date, time, location, starting_point, ending_point, description, distance, max_participants)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *`;
    const {rows:[eventData]} = await knex.raw(query, [name, eventCreatedBy, date, time, location, startingPoint, endingPoint, description, distance, maxParticipants]);
    return eventData;
   } catch (error){
    throw new Error(`Unable to create event: ${error.message}`)
   }
  }

  // Updates the event that matches the given id with new data.
  // Returns the modified event
  static async update(name, date, time, location, starting_point, ending_point, description, distance, max_participants, eventId, userId) {
   try {
    const query = `
      UPDATE run_events
      SET name=?,
       date=?,
       time=?,
       location=?,
       starting_point=?,
       ending_point=?,
       description=?,
       distance=?,
       max_participants=?
      WHERE id=? AND event_created_by = ?
      RETURNING *
    `;
    const {rows:[eventData]} = await knex.raw(query, [name, date, time, location, starting_point, ending_point, description, distance, max_participants, eventId, userId])
    return eventData; 
   }  catch (error){
    throw new Error(`Unable to update event: ${error.message}`)
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
    throw new Error('Invalid eventId');
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

  static async filter(size, distance, date){
   const arr = [] 
   let query = `SELECT * FROM run_events`;

   try{
   let whereClause = false
    if (size) {
     query += ` WHERE max_participants = ?`;
     arr.push(size);
     whereClause = true;
    }

    if(distance) {
     query += whereClause ? ` AND distance = ?` : ` WHERE distance = ?`;
     arr.push(distance);
     whereClause = true;
    }

    if(date) {
     query += whereClause ? ` AND date = ?` : ` WHERE date = ?`;
     arr.push(date);
     }

    const {rows} = await knex.raw(query, arr);
    return rows
   } catch (error){
    throw new Error(`Unable to filter events: ${error.message}`)
   }
  }
}

module.exports = Event;