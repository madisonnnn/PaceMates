import { useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import { useParams } from 'react-router-dom';

const EventDetails = () => {
  const { eventList } = useContext(EventContext);
  const { id } = useParams();
  
  const event = eventList.find(event => event.id === parseInt(id));

  if (!event) {
    return <p>Event not found.</p>;
  }

  return (
    // figure out what makes more sense to have in the card vs here
    // think max needs to be in card
    <div className="event-details">
      {/* Map */}
      <p>Start Address: {event.startAddress}</p>
      <p>End Address: {event.endAddress}</p>
      <p>Figure out distance</p>
      <p>Location: {event.location}</p>

      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      {/* dropdown somehow? */}
      <p>Figure out attending</p>
      <p>Description: {event.description}</p>
      {/* move to card? nice to have like 10/15 */}
      <p>Max Participants: {event.maxParticipants}</p>

      {/* button to "attend" */}
      {/* if user who created, button to edit and delete */}
    </div>
  );
};

export default EventDetails;
