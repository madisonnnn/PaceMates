import { useNavigate } from 'react-router-dom';

const EventCard = ({ event }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/events/${event.id}`);  
  };

  return (
    <div className="ui card" onClick={handleClick} style={{ margin: '20px' }}>
      <div className="image">
        <img src={event.imageUrl || 'default-image-url'} />
      </div>

      <div className="content">
        <div className="header">{event.name}</div>
      
        <div className="meta">
          <span>
            Time: {event.time} on {event.date}
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
      </div>

      <div className="extra content">
        <span>
          <i className="fas fa-user" />
          Event created by: {event.id}
        </span>
      </div>
    </div>
  );
};

export default EventCard;
