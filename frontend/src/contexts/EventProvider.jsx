import { useState } from 'react';

export const EventProvider = ({ children }) => {
  const [eventList, setEventList] = useState([]);
  const [eventDetails, setEventDetails] = useState(null);

  return (
    <EventContext.Provider value={{ eventList, setEventList, eventDetails, setEventDetails }}>
      {children}
    </EventContext.Provider>
  );
};
