import { createContext, useState } from 'react';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [eventList, setEventList] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);

  const addEvent = (event) => {
    setEventList((prevEvents) => [...prevEvents, event]);
  };

  return (
    <EventContext.Provider value={{ eventList, eventDetails, setEventDetails, addEvent }}>
      {children}
    </EventContext.Provider>
  );
};
