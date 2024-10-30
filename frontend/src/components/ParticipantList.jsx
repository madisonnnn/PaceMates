import { useState,useEffect } from 'react';
import { getAllParticipants } from '../adapters/event-participant-adapter';
import { useParams } from 'react-router-dom';

const ParticipantList = () => {
  const [participantList, setParticipantList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getAllParticipants(parseInt(id)).then(setParticipantList)
  }, [participantList]);

  return (
    <div>
      {participantList.length > 0 ? (
        <ul>
          {participantList.map(participant => (
            <li key={participant.user_id}>{participant.first_name} {participant.last_name}</li>
          ))}
        </ul>
      ) : (
        <p>No participants are currently attending.</p>
      )}
    </div>
  );
};

export default ParticipantList
