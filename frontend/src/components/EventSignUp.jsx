import { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { ParticipantContext } from '../contexts/ParticipantContext';
import { signUp, optOut } from '../adapters/event-participant-adapter';
import '../styles/EventSignupStyles.css'


const EventSignUp = () => {
 const { participantList, addParticipant, removeParticipant } = useContext(ParticipantContext)

 const { id } = useParams();
const signUpForEvent = async () => {
 try {
  const newParticipant = await signUp(parseInt(id))
  if (newParticipant) {
    addParticipant(newParticipant)
  } else {
   console.error("No participant data returned.");
 }
} catch (error) {
  console.error("Error signing up for event:", error)
}
}

const optOutOfEvent = async () => {
 try {
  const participantToDelete = await optOut(parseInt(id))
  if (participantToDelete) {
    removeParticipant(participantToDelete)
  } else {
   console.error("No participant data returned.");
 }
} catch (error) {
  console.error("Error opting out of event:", error)
}
}
  
  return (
    <div className="event-button">
      <button className='button'onClick={signUpForEvent}>
       Sign Up For Event!
      </button>
      <button className='button'onClick={optOutOfEvent}>
       Opt Out Of Event!
      </button>
    </div>
  );
};

export default EventSignUp;