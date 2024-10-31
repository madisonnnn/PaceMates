import { useNavigate, useParams } from "react-router-dom";
import { updateEvent } from "../adapters/event-adapter";
import { useState, useEffect } from "react";
import { getEvent } from "../adapters/event-adapter";
import '../styles/EventUpdateStyles.css'

export default function EventUpdate() {
 const navigate = useNavigate();
 const [currentEvent, setCurrentEvent] = useState(null);
 const { id } = useParams();
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
 
  useEffect(() => {
    getEvent(parseInt(id)).then((event)=> {
     setCurrentEvent(event)
     setFormData({
      name: event.name || '',
      date: event.date || '',
      time: event.time || '',
      starting_point: event.starting_point || '',
      ending_point: event.ending_point || '',
      location: event.location || '',
      description: event.description || '',
      max_participants: event.max_participants || '',
    });
    console.log(event)
    })
  }, [id]);

 

 const handleSubmit = async (event) => {
   event.preventDefault();
   try {
   const eventToUpdate = await updateEvent(formData, id);
   console.log(eventToUpdate)
   setCurrentEvent(eventToUpdate);
   } catch (error) {
    console.error(`Unable to update Event: ${error.message}`)
  if (error?.cause > 400 && error?.cause < 500) {
     setCurrentEvent(null);
     return navigate('/events');
   }
   }};

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

if (!currentEvent) {
 return <p>Loading...</p>;
}

 return <form className='form' onSubmit={handleSubmit} aria-labelledby="update-heading">
   <h2 id="update-heading">Update Event {currentEvent.name} </h2>
    <label className='title' htmlFor="event-name">Event Name:</label>
        <input className='input-box'
          type="text"
          id="event-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
         <label className='title' htmlFor="event-time">Event Start Time:</label>
        <input className='input-box'
          type="time"
          id="event-time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <label className='title' htmlFor="event-date">Event Date:</label>
        <input className='input-box'
          type="date"
          id="event-date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label className='title' htmlFor="start-address">Starting Address:</label>
        <input className='input-box'
          type="text"
          id="start-address"
          name="starting_point"
          placeholder="Enter starting point"
          value={formData.starting_point}
          onChange={handleChange}
        />
        <label className='title' htmlFor="end-address">Ending Address:</label>
        <input className='input-box'
          type="text"
          id="end-address"
          name="ending_point"
          placeholder="Enter ending point"
          value={formData.ending_point}
          onChange={handleChange}
        />
        <label className='title' htmlFor="location">Event Location (Borough):</label>
        <select className='button' 
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
        <label className='title' htmlFor="event-description">Event Description:</label>
        <textarea className='text-area'
          id="event-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
         <label className='title' htmlFor="max-participants">Max Participants:</label>
        <input className='input-box'
          type="number"
          id="max-participants"
          name="max_participants"
          placeholder="Enter maximum number of participants"
          min="1"  // at least 1 participant -> person who created event would attend ? 
          value={formData.max_participants}
          onChange={handleChange}
        />
      <button className='button' type="submit">Update Event</button>
 </form>;
}

