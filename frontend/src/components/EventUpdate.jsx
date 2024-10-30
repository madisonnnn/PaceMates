import { useNavigate } from "react-router-dom";
import { updateEvent } from "../adapters/event-adapter";

export default function EventUpdate({ currentEvent, setCurrentEvent }) {
 const navigate = useNavigate();
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

 const handleSubmit = async (event) => {
   event.preventDefault();
   const formData = new FormData(event.target);
   const [event, error] = await updateEvent(Object.fromEntries(formData));
   // If our event isn't who they say they are
   // (an auth error on update) log them out
   // We added the httpStatus as a custom cause in our error
   if (error?.cause > 400 && error?.cause < 500) {
     setCurrentEvent(null);
     return navigate('/events');
   }

   setCurrentEvent(event);
   event.target.reset();
   setFormData({ name: '', time: '', date: '', starting_point: '', ending_point: '', location: '',description: '', max_participants: '' });
 };

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.name]: e.target.value });
};

 return <form onSubmit={handleSubmit} aria-labelledby="update-heading">
   <h2 id="update-heading">Update Event {currentEvent.name} </h2>
    <label htmlFor="event-name">Event Name:</label>
        <input
          type="text"
          id="event-name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
         <label htmlFor="event-time">Event Start Time:</label>
        <input
          type="time"
          id="event-time"
          name="time"
          value={formData.time}
          onChange={handleChange}
        />
        <label htmlFor="event-date">Event Date:</label>
        <input
          type="date"
          id="event-date"
          name="date"
          value={formData.date}
          onChange={handleChange}
        />
        <label htmlFor="start-address">Starting Address:</label>
        <input
          type="text"
          id="start-address"
          name="starting_point"
          placeholder="Enter starting point"
          value={formData.starting_point}
          onChange={handleChange}
        />
        <label htmlFor="end-address">Ending Address:</label>
        <input
          type="text"
          id="end-address"
          name="ending_point"
          placeholder="Enter ending point"
          value={formData.ending_point}
          onChange={handleChange}
        />
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
        <label htmlFor="event-description">Event Description:</label>
        <textarea
          id="event-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
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
      <button type="submit">Update Event</button>
 </form>;
}

