import { useState } from 'react';
import { ParticipantContext } from './ParticipantContext';

export const ParticipantProvider = ({ children }) => {
  const [participantList, setParticipantList] = useState([]);

  return (
    <ParticipantContext.Provider value={{ participantList, setParticipantList}}>
      {children}
    </ParticipantContext.Provider>
  );
};
