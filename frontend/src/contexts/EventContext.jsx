import { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventList, setEventList] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);


  const addEvent = (event) => {
    setEventList((prevEvents) => [...prevEvents, event]);
  };

  const removeEvent = (eventToDelete) => {
    (eventList.includes(eventToDelete)) ? 
    setEventList((prevEvents) =>  prevEvents.filter((event) => event !== eventToDelete)) : 
    console.log('Cannot delete this event.')
  };



  return (
    <EventContext.Provider value={{ eventList, eventDetails, setEventDetails, addEvent, removeEvent }}>
      {children}
    </EventContext.Provider>
  );
};
