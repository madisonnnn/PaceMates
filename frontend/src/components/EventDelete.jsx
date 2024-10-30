import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { EventContext } from '../contexts/EventContext';
import { deleteEvent } from '../adapters/event-adapter';
import '../styles/EventDetailsStyles.css'


const EventDelete = () => {
 const { removeEvent } = useContext(EventContext)
 const navigate = useNavigate();
 const { id } = useParams();

const deleteTheEvent = async () => {
 try {
  const eventToDelete = await deleteEvent(parseInt(id))
  console.log(eventToDelete)
  if (eventToDelete) {
    removeEvent(eventToDelete)
    navigate(`/events`)
  } else {
   console.error("No event data returned.");
 }
} catch (error) {
  console.error("Error opting out of event:", error)
}
}
  
  return (
    <div className="event-button">
      <button className='button' onClick={deleteTheEvent}>
       Delete Event!
      </button>
    </div>
  );
};

export default EventDelete;