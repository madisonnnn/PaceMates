import { useState, useContext } from 'react';
import { EventContext } from '../contexts/EventContext';

const CreateEventForm = () => {
  const { addEvent } = useContext(EventContext);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    startAddress: '',
    endAddress: '',
    description: '',
    maxParticipants: '',
    // include location -> dropdown of boroughs 
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      id: Date.now(),
      imageUrl: 'default-image-url'
    };
    addEvent(newEvent);
    setFormData({ title: '', date: '', time: '', startAddress: '', endAddress: '', description: '', maxParticipants: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* reach out to Mekhi about Cloudinary for pic? */}
      <div>
        <label htmlFor="event-name">Event Name:</label>
        <input
          type="text"
          id="event-name"
          name="title"
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="event-time">Event Start Time:</label>
        <input
          type="time"
          id="event-time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="event-date">Event Date:</label>
        <input
          type="date"
          id="event-date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
      </div>
      {/* use Google API for addresses to infer the address?
          think would be able to get latitude and longitude, and other data
          distance?
      */}
      <div>
        <label htmlFor="start-address">Starting Address:</label>
        <input
          type="text"
          id="start-address"
          name="startAddress"
          placeholder="Enter starting point"
          value={formData.startAddress}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="end-address">Ending Address:</label>
        <input
          type="text"
          id="end-address"
          name="endAddress"
          placeholder="Enter ending point"
          value={formData.endAddress}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="event-description">Event Description:</label>
        <textarea
          id="event-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label htmlFor="max-participants">Max Participants:</label>
        <input
          type="number"
          id="max-participants"
          name="maxParticipants"
          placeholder="Enter maximum number of participants"
          min="1"  // at least 1 participant -> person who created event would attend ? 
          value={formData.maxParticipants}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;