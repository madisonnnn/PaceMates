const { isAuthorized } = require('../utils/auth-utils');

const Event = require('../models/Events');
const EventParticipants = require('../models/EventParticipants')


exports.listEvents = async (req, res) => {
  const events = await Event.list();
  res.send(events);
};

exports.listEvent = async (req, res) => {
 const eventId = req.params.id
 const event = await Event.find(eventId);
 res.send(event);
};

exports.createEvent = async (req, res) => {
 const { name, date, starting_point, ending_point, description, max_participants,time,location } = req.body;
 const {userId} = req.session
 // console.log(req.body)
 // console.log(req.session)
 // name,eventCreatedBy,starting_point, ending_point,distance,max_participants
 //{ "name": "madison","date": "tmrw", "starting_point": "1", "ending_point": "2","description":"fun run,","max_participants":"14"}
 const distance = ending_point - starting_point 
 // console.log(name,date, starting_point, ending_point,description, distance,max_participants,time,location)

 const event = await Event.create(name, userId, date,starting_point, ending_point,description, distance,max_participants,time,location);

 res.send(event);
};

exports.updateEvent = async (req, res) => {
 const { name, date, starting_point, ending_point, description, max_participants,time,location } = req.body;
 const eventId = req.params.id
 const {userId} = req.session
 //{ "name": "madison","date": "tmrw", "starting_point": "1", "ending_point": "2","description":"fun run,","max_participants":"14"}
 const distance = ending_point - starting_point 
 //console.log(name, date,starting_point, ending_point,description, distance,max_participants)

 const event = await Event.update(name, date, starting_point, ending_point,description, distance, max_participants,time,location, eventId,userId);

 res.send(event);
};

exports.deleteEvent = async (req, res) => {
 const eventId = req.params.id
 const {userId} = req.session
 //console.log(eventId, userId)
 //const eventParticipants = await EventParticipants.deleteAllFromEvent(userId)
 const event = await Event.delete(eventId, userId);
 res.send(event);
};

exports.filterEvents = async (req, res) => {
 const {size, distance, location} = req.query
 //console.log(eventId, userId)
 console.log(req.query)
 //const eventParticipants = await EventParticipants.deleteAllFromEvent(userId)
 const event = await Event.filter(size,distance,location);
 res.send(event);
};