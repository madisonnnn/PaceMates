const {isAuthorized} = require('../utils/auth-utils');
const EventParticipants = require('../models/EventParticipants')

exports.listParticipants = async (req, res) => {
 const eventId = req.params.id
 const participants = await EventParticipants.listAll(eventId);
 res.send(participants);
};

exports.deleteFromEvent = async (req, res) => {
 const {userId} = req.session
 console.log(req.session)
 const event = await EventParticipants.delete(userId);
 res.send(event);
};

exports.signUpForEvent = async (req, res) => {
 const {userId} = req.session
 const eventId = req.params.id
 console.log(eventId,userId )
 const event = await EventParticipants.signUp(eventId, userId);
 res.send(event);
};

exports.deleteParticipant = async (req, res) => {
 const {userId} = req.session
 const eventId = req.params.id
 const event = await EventParticipants.delete(userId, eventId);
 res.send(event);
};