const knex = require('../db/knex');

class EventParticipants {
 static async listAll(event_id) {
  try {
   const query = `SELECT * FROM event_participants WHERE event_id = ?`
   const {rows:[eventData]} = await knex.raw(query, [event_id]);
  return eventData
 } catch (error){
  throw new Error(`Unable to find participants: ${error.message}`)
 }}

 static async delete(user, event){
 try {
   const query = `DELETE FROM event_participants WHERE user_id = ? AND event_id = ?`
   const {rows:[eventData]} = await knex.raw(query, [user,event]);
  return eventData
 } catch (error){
  throw new Error(`Unable to delete participant: ${error.message}`)
 }
 }

 static async deleteAllFromEvent(event){
  try {
    const query = `DELETE FROM event_participants WHERE event_id = ? RETURNING *`
    const {rows:[eventData]} = await knex.raw(query, [event]);
   return eventData
  } catch (error){
   throw new Error(`Unable to delete participants: ${error.message}`)
  }
  }
  static async signUp(event,user){
   try {
     const query = `INSERT INTO event_participants (event_id, user_id) VALUES (?,?) RETURNING *`
     const {rows:[eventData]} = await knex.raw(query, [event,user]);
    return eventData
   } catch (error){
    throw new Error(`Unable to sign up for event: ${error.message}`)
   }
   }
}

module.exports = EventParticipants