import { useState, useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import { createEvent } from '../adapters/event-adapter';

const CreateEventForm = () => {
  const { addEvent } = useContext(EventContext);
  const [formData, setFormData] = useState({
    name: '',
    date: '',
    time: '',
    starting_point: '',
    ending_point: '',
    location: '',
    description: '',
    max_participants: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target)
    // const newEvent = {
    //   ...formData,
    //   id: Date.now(),
    //   imageUrl: 'default-image-url'
    // };
   
    const [newEvent, error] = await createEvent(Object.fromEntries(formData)); 
    // console.log(formData.name,formData.time,formData.starting_point,formData.ending_point,formData.location,formData.description,formData.max_participants)
    // console.log(newEvent)
    addEvent(newEvent);
    setFormData({ name: '', time: '', date: '', starting_point: '', ending_point: '', location: '',description: '', max_participants: '' });

  };

  return (
    <form onSubmit={handleSubmit}>
      {/* reach out to Mekhi about Cloudinary for pic? */}
      <div>
        <label htmlFor="event-name">Event Name:</label>
        <input
          type="text"
          id="event-name"
          name="name"
          value={formData.name}
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
          name="starting_point"
          placeholder="Enter starting point"
          value={formData.starting_point}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="end-address">Ending Address:</label>
        <input
          type="text"
          id="end-address"
          name="ending_point"
          placeholder="Enter ending point"
          value={formData.ending_point}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="location">Event Location (Borough):</label>
        <select
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
        >
          <option value="">Select a borough</option>
          <option value="manhattan">Manhattan</option>
          <option value="brooklyn">Brooklyn</option>
          <option value="queens">Queens</option>
          <option value="bronx">Bronx</option>
          <option value="staten island">Staten Island</option>
        </select>
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
          name="max_participants"
          placeholder="Enter maximum number of participants"
          min="1"  // at least 1 participant -> person who created event would attend ? 
          value={formData.max_participants}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;