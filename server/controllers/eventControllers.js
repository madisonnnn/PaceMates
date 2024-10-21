const { isAuthorized } = require('../utils/auth-utils');

const Event = require('../models/Events');
const EventParticipants = require('../models/EventParticipants')


exports.listEvents = async (req, res) => {
  const events = await Event.list();
  res.send(events);
};

exports.createEvent = async (req, res) => {
 const { name, date, starting_point, ending_point, description, max_participants } = req.body;
 const {userId} = req.session
 // console.log(req.body)
 // console.log(req.session)
 // name,eventCreatedBy,starting_point, ending_point,distance,max_participants
 //{ "name": "madison","date": "tmrw", "starting_point": "1", "ending_point": "2","description":"fun run,","max_participants":"14"}
 const distance = ending_point - starting_point 
 console.log(name, userId, date,starting_point, ending_point,description, distance,max_participants)

 const event = await Event.create(name, userId, date,starting_point, ending_point,description, distance,max_participants);

 res.send(event);
};

exports.deleteEvent = async (req, res) => {
 const eventId = req.params.id
 const {userId} = req.session
 console.log(eventId, userId)
 //const eventParticipants = await EventParticipants.deleteAllFromEvent(userId)
 const event = await Event.delete(eventId, userId);
 res.send(event);
};