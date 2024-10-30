import { createContext, useState } from 'react';

export const ParticipantContext = createContext();

export const ParticipantProvider = ({ children }) => {
  const [participantList, setParticipantList] = useState([]);

  const addParticipant = (participant) => {
    !(participantList.includes(participant)) ? 
    setParticipantList((prevParticipants) => [...prevParticipants, participant]) : 
    console.log('You\'ve already signed up for this event.')
  };

  const removeParticipant = (participantToDelete) => {
    (participantList.includes(participantToDelete)) ? 
    setParticipantList((prevParticipants) =>  prevParticipants.filter((participant) => participant !== participantToDelete)) : 
    console.log('You\'re not signed up for this event.')
  };

  return (
    <ParticipantContext.Provider value={{ participantList, setParticipantList, addParticipant, removeParticipant }}>
      {children}
    </ParticipantContext.Provider>
  );
};
