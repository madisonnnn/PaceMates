// import { useNavigate } from 'react-router-dom';
// import { getEvent } from '../adapters/event-adapter';

// const EventCard = ({ event }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/events/${event.id}`);  
//   };

//   return (
//     <div className="ui card" onClick={handleClick} style={{ margin: '20px' }}>
//       <div className="content">
//         <div className="header">{event.name}</div>
      
//         <div className="meta">
//           <span>
//             Time: {event.time} on {event.date}
//           </span>
//         </div>

//         <div className="description">
//           <span>
//             Starting Address: {event.starting_point}
//           </span>
//         </div>

//         <div className="location">
//           <span>
//             Location: {event.location}
//           </span>
//         </div>
//       </div>

//       <div className="extra content">
//         <span>
//           <i className="fas fa-user" />
//           {/* change this to name of creator of event */}
//           Event created by: {event.id}
//         </span>
//       </div>
//     </div>
//   );
// };

// export default EventCard;

import { useNavigate } from 'react-router-dom';
import "../styles/EventCardStyles.css"

const formatTime = (time) => {
  const [hour, minute] = time.split(':'); 
  const formattedHour = hour % 12 || 12; 
  const ampm = hour < 12 ? 'AM' : 'PM'; 
  return `${formattedHour}:${minute} ${ampm}`;
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);  
  };

  return (
    <div className="ui card" onClick={handleClick} style={{ margin: '20px' }}>
      <div className="content">
        <div className="header">{event.name}</div>
      
        <div className="meta">
          <span>
            Time: {formatTime(event.time)} 
          </span>
        </div>

        <div className="meta">
          <span>
            Date: {event.date} 
          </span>
        </div>

        <div className="description">
          <span>
            Starting Address: {event.starting_point}
          </span>
        </div>

        <div className="location">
          <span>
            Location: {event.location}
          </span>
        </div> 
        <div className="extra-content">
        <span>
          <i className="fas fa-user" />
          {/* change this to name of creator of event */}
          Event created by: {event.id}
        </span>
      </div>
      </div>

     
    </div>
  );
};

export default EventCard;

