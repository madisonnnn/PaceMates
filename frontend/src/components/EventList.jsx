import { useContext,useState,useEffect } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventCard from './EventCard';
import { getFilteredEvents, getAllEvents } from '../adapters/event-adapter';

const EventList = ({filteredEvents}) => {
  const [eventList, setEventList] = useState([]);


  useEffect(() => {
    if(filteredEvents && filteredEvents.length > 0){
       setEventList(filteredEvents);
    }
   else {
    getAllEvents().then(setEventList);
   }
  }, [eventList]);

  return (
    <div className="event-list">
      {eventList.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
