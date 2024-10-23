import { useContext,useState,useEffect } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventCard from './EventCard';
import { getAllEvents } from '../adapters/event-adapter';

const EventList = () => {
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    getAllEvents().then(setEventList);
  }, []);

  return (
    <div className="event-list">
      {eventList.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
