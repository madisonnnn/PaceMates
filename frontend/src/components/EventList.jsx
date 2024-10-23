import { useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import EventCard from './EventCard';

const EventList = () => {
  const { eventList } = useContext(EventContext);

  return (
    <div className="event-list">
      {eventList.map(event => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default EventList;
