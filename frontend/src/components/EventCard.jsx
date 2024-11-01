// // import { useNavigate } from 'react-router-dom';
// // import { getEvent } from '../adapters/event-adapter';

// // const EventCard = ({ event }) => {
// //   const navigate = useNavigate();

// //   const handleClick = () => {
// //     navigate(`/events/${event.id}`);  
// //   };

// //   return (
// //     <div className="ui card" onClick={handleClick} style={{ margin: '20px' }}>
// //       <div className="content">
// //         <div className="header">{event.name}</div>
      
// //         <div className="meta">
// //           <span>
// //             Time: {event.time} on {event.date}
// //           </span>
// //         </div>

// //         <div className="description">
// //           <span>
// //             Starting Address: {event.starting_point}
// //           </span>
// //         </div>

// //         <div className="location">
// //           <span>
// //             Location: {event.location}
// //           </span>
// //         </div>
// //       </div>

// //       <div className="extra content">
// //         <span>
// //           <i className="fas fa-user" />
// //           {/* change this to name of creator of event */}
// //           Event created by: {event.id}
// //         </span>
// //       </div>
// //     </div>
// //   );
// // };

// // export default EventCard;

// import { useNavigate } from 'react-router-dom';
// import "../styles/EventCardStyles.css"

// const formatTime = (time) => {
//   const [hour, minute] = time.split(':'); 
//   const formattedHour = hour % 12 || 12; 
//   const ampm = hour < 12 ? 'AM' : 'PM'; 
//   return `${formattedHour}:${minute} ${ampm}`;
// };

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
//             Time: {formatTime(event.time)} 
//           </span>
//         </div>

//         <div className="meta">
//           <span>
//             Date: {event.date} 
//           </span>
//         </div>

//         <div className="description">
//           <span>
//             Starting Address: {event.starting_point}
//           </span>
//         </div>

//         <div className="location">
//           <span>
//             Location: {event.location ? event.location.charAt(0).toUpperCase() + event.location.slice(1) : ''}
//           </span>
//         </div> 
//         <div className="extra-content">
//         <span>
//           <i className="fas fa-user" />
//           Event created by: {event.id} {event.event_created_by} 
//         </span>
//       </div>
//       </div>

     
//     </div>
//   );
// };

// export default EventCard;

// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import '../styles/EventCardStyles.css';

// const formatTime = (time) => {
//   const [hour, minute] = time.split(':');
//   const formattedHour = hour % 12 || 12;
//   const ampm = hour < 12 ? 'AM' : 'PM';
//   return `${formattedHour}:${minute} ${ampm}`;
// };

// // Hardcoded mapping of user IDs to names
// const userNames = {
//   1: 'Alice Smith',
//   2: 'Bob Johnson',
//   3: 'Charlie Brown',
//   // Add more users as needed
// };

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
//           <span>Time: {formatTime(event.time)}</span>
//         </div>

//         <div className="meta">
//           <span>Date: {event.date}</span>
//         </div>

//         <div className="description">
//           <span>Starting Address: {event.starting_point}</span>
//         </div>

//         <div className="location">
//           <span>
//             Location: {event.location ? event.location.charAt(0).toUpperCase() + event.location.slice(1) : ''}
//           </span>
//         </div>

//         <div className="extra-content">
//           <span>
//             <i className="fas fa-user" />
//             Event created by: {userNames[event.event_created_by] || event.event_created_by} {/* Fallback to ID */}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EventCard;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/EventCardStyles.css';

const formatTime = (time) => {
  const [hour, minute] = time.split(':');
  const formattedHour = hour % 12 || 12;
  const ampm = hour < 12 ? 'AM' : 'PM';
  return `${formattedHour}:${minute} ${ampm}`;
};

// Hardcoded mapping of user IDs to names
const userNames = {
  1: 'Alice Smith',
  2: 'Bob Johnson',
  3: 'Charlie Brown',
  // Add more users as needed
};

// Function to get a random user ID
const getRandomUserId = () => {
  const userIds = Object.keys(userNames).map(Number); // Get an array of user IDs
  const randomIndex = Math.floor(Math.random() * userIds.length); // Generate a random index
  return userIds[randomIndex]; // Return a random user ID
};

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  // If event.event_created_by is not set, assign a random user ID
  const creatorId = event.event_created_by || getRandomUserId();
  const creatorName = userNames[creatorId] || 'Unknown User'; // Fallback to 'Unknown User'

  const handleClick = () => {
    navigate(`/events/${event.id}`);
  };

  return (
    <div className="ui card" onClick={handleClick} style={{ margin: '20px' }}>
      <div className="content">
        <div className="header">{event.name}</div>

        <div className="meta">
          <span>Time: {formatTime(event.time)}</span>
        </div>

        <div className="meta">
          <span>Date: {event.date}</span>
        </div>

        <div className="description">
          <span>Starting Address: {event.starting_point}</span>
        </div>

        <div className="location">
          <span>
            Location: {event.location ? event.location.charAt(0).toUpperCase() + event.location.slice(1) : ''}
          </span>
        </div>

        <div className="extra-content">
          <span>
            <i className="fas fa-user" />
            Event created by: {creatorName} {/* Display the creator's name */}
          </span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

