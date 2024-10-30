import { useState,useEffect } from 'react';
import { getAllParticipants } from '../adapters/event-participant-adapter';
import { useParams } from 'react-router-dom';
import '../styles/ParticipantListStyles.css'

const ParticipantList = () => {
  const [participantList, setParticipantList] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    getAllParticipants(parseInt(id)).then(setParticipantList)
  }, [participantList]);

  return (
    <div >
      {participantList.length > 0 ? (
        <div className='list'>
          {participantList.map(participant => (
            <p className='list-item' key={participant.user_id}>{participant.first_name} {participant.last_name}</p>
          ))}
        </div>
      ) : (
        <p className='no-list'>No participants are currently attending.</p>
      )}
    </div>
  );
};

export default ParticipantList
