import { useState, useContext } from 'react';
import { EventContext } from '../contexts/EventContext';
import { createEvent } from '../adapters/event-adapter';
import '../styles/EventFormStyles.css'

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
    <form className='form' onSubmit={handleSubmit}>
      {/* reach out to Mekhi about Cloudinary for pic? */}
      <div>
        <label className='title' htmlFor="event-name">Event Name:</label>
        <input className='input-box'
          type="text"
          id="event-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='title'htmlFor="event-time">Event Start Time:</label>
        <input className='input-box'
          type="time"
          id="event-time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='title'htmlFor="event-date">Event Date:</label>
        <input className='input-box'
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
        <label className='title'htmlFor="start-address">Starting Address:</label>
        <input className='input-box'
          type="text"
          id="start-address"
          name="starting_point"
          placeholder="Enter starting point"
          value={formData.starting_point}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='title'htmlFor="end-address">Ending Address:</label>
        <input className='input-box' 
          type="text"
          id="end-address"
          name="ending_point"
          placeholder="Enter ending point"
          value={formData.ending_point}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className='title'htmlFor="location">Event Location (Borough):</label>
        <select 
          className='button' 
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
        <label className='title'htmlFor="event-description">Event Description:</label>
        <textarea className='text-area'
          id="event-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label className='title'htmlFor="max-participants">Max Participants:</label>
        <input className='input-box'
          type="number"
          id="max-participants"
          name="max_participants"
          placeholder="Enter maximum number of participants"
          min="1"  // at least 1 participant -> person who created event would attend ? 
          value={formData.max_participants}
          onChange={handleChange}
        />
      </div>
      <button className='button' type="submit">Create Event</button>
    </form>
  );
};

export default CreateEventForm;