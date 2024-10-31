import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getEvent } from '../adapters/event-adapter';
import EventSignUp from './EventSignUp';
import ParticipantList from './ParticipantList';
import EventDelete from './EventDelete';
import EventUpdate from './EventUpdate';
import '../styles/EventDetailsStyles.css'

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null)

  const handleUpdateEventClick = () => {
    setShowForm(!showForm);
  }
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // State for user authentication status
  // const navigate = useNavigate(); // for redirection

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const [eventData] = await getEvent(parseInt(id));
        if (eventData) {
          setEvent(eventData)
          
        } else {
          setError('Event not found');
        }
      } catch (error) {
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id])
  if (loading) {
    return <p>Loading event details...</p>;
  }

  // Error state
  if (error) {
    return <p>{error}</p>;
  }
  return (
    // figure out what makes more sense to have in the card vs here
    // think max needs to be in card
    <div className="event-details">
      <div className='info'> 
      {/* Map */}
      <div className='card' id='card-one'>
        <p>Start Address: {event.starting_point}</p>
      <p>End Address: {event.ending_point}</p>
      <p>Distance: {event.distance}</p>
      </div>
      <div className='card' id='card-two'>
         <h2>{event.name}</h2>
      <p>Location: {event.location}</p>

     
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      {/* dropdown somehow? */}
      <p>Attending: <ParticipantList/>
      </p>
      <p>Description: {event.description}</p>
      {/* move to card? nice to have like 10/15 */}
      <p>Max Participants: {event.max_participants}</p>

      {/* button to "attend" */}
      <EventSignUp className='button'/>
      </div>
      
      {/* if user who created, button to edit and delete */}
      <EventDelete className='button'/>
      </div>
     <div> 
      <h1> Update Event</h1>
      <button className='button' onClick={handleUpdateEventClick}>
        {showForm ? 'Close Form' : 'Update Event'}
      </button>

      {showForm && <EventUpdate currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />}
      </div>
    </div>
  );
}; 

export default EventDetails;
