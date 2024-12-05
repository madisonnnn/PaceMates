// // does update the event details, however doesn't refresh and map doesn't load 
import { useNavigate, useParams } from "react-router-dom";
import { updateEvent } from "../adapters/event-adapter";
import { useState, useEffect } from "react";
import { getEvent } from "../adapters/event-adapter";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import '../styles/EventUpdateStyles.css'

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
          <option value="">Select a Borough</option>
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









// import { useNavigate, useParams } from "react-router-dom";
// import { updateEvent, getEvent } from "../adapters/event-adapter";
// import { useState, useEffect, useRef } from "react";
// import { LoadScript, Autocomplete } from "@react-google-maps/api";
// import '../styles/EventUpdateStyles.css';

// const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// export default function EventUpdate() {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [currentEvent, setCurrentEvent] = useState(null);
//   const [formData, setFormData] = useState({
//     name: '',
//     date: '',
//     time: '',
//     starting_point: '',
//     ending_point: '',
//     location: '',
//     description: '',
//     max_participants: '',
//   });

//   const startingPointRef = useRef(null);
//   const endingPointRef = useRef(null);

//   useEffect(() => {
//     getEvent(parseInt(id)).then((event) => {
//       setCurrentEvent(event);
//       setFormData({
//         name: event.name || '',
//         date: event.date || '',
//         time: event.time || '',
//         starting_point: event.starting_point || '',
//         ending_point: event.ending_point || '',
//         location: event.location || '',
//         description: event.description || '',
//         max_participants: event.max_participants || '',
//       });
//     });
//   }, [id]);

//   const handlePlaceChange = (field) => {
//     if (field === "starting_point" && startingPointRef.current) {
//       setFormData({ ...formData, starting_point: startingPointRef.current.getPlace().formatted_address });
//     } else if (field === "ending_point" && endingPointRef.current) {
//       setFormData({ ...formData, ending_point: endingPointRef.current.getPlace().formatted_address });
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await updateEvent(formData, id);
//       navigate(0); // Refreshes the page to show the updated event
//     } catch (error) {
//       console.error(`Unable to update Event: ${error.message}`);
//       if (error?.cause > 400 && error?.cause < 500) {
//         setCurrentEvent(null);
//         return navigate('/events');
//       }
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   if (!currentEvent) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={["places"]}>
//       <form className='form' onSubmit={handleSubmit} aria-labelledby="update-heading">
//         <h2 id="update-heading">Update Event {currentEvent.name}</h2>

//         <label className='title' htmlFor="event-name">Event Name:</label>
//         <input
//           className='input-box'
//           type="text"
//           id="event-name"
//           name="name"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <label className='title' htmlFor="event-time">Event Start Time:</label>
//         <input
//           className='input-box'
//           type="time"
//           id="event-time"
//           name="time"
//           value={formData.time}
//           onChange={handleChange}
//         />

//         <label className='title' htmlFor="event-date">Event Date:</label>
//         <input
//           className='input-box'
//           type="date"
//           id="event-date"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//         />

//         <label className='title' htmlFor="start-address">Starting Address:</label>
//         <Autocomplete onLoad={(autocomplete) => (startingPointRef.current = autocomplete)} onPlaceChanged={() => handlePlaceChange("starting_point")}>
//           <input
//             className='input-box'
//             type="text"
//             id="start-address"
//             name="starting_point"
//             placeholder="Enter starting point"
//             value={formData.starting_point}
//             onChange={handleChange}
//           />
//         </Autocomplete>

//         <label className='title' htmlFor="end-address">Ending Address:</label>
//         <Autocomplete onLoad={(autocomplete) => (endingPointRef.current = autocomplete)} onPlaceChanged={() => handlePlaceChange("ending_point")}>
//           <input
//             className='input-box'
//             type="text"
//             id="end-address"
//             name="ending_point"
//             placeholder="Enter ending point"
//             value={formData.ending_point}
//             onChange={handleChange}
//           />
//         </Autocomplete>

//         <label className='title' htmlFor="location">Event Location (Borough):</label>
//         <select
//           className='button'
//           id="location"
//           name="location"
//           value={formData.location}
//           onChange={handleChange}
//         >
//           <option value="">Select a Borough</option>
//           <option value="manhattan">Manhattan</option>
//           <option value="brooklyn">Brooklyn</option>
//           <option value="queens">Queens</option>
//           <option value="bronx">Bronx</option>
//           <option value="staten island">Staten Island</option>
//         </select>

//         <label className='title' htmlFor="event-description">Event Description:</label>
//         <textarea
//           className='text-area'
//           id="event-description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//         ></textarea>

//         <label className='title' htmlFor="max-participants">Max Participants:</label>
//         <input
//           className='input-box'
//           type="number"
//           id="max-participants"
//           name="max_participants"
//           placeholder="Enter maximum number of participants"
//           min="1"
//           value={formData.max_participants}
//           onChange={handleChange}
//         />

//         <button className='button' type="submit">Update Event</button>
//       </form>
//     </LoadScript>
//   );
// }








// return (
//   <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
//     <div className="form-map-container">
//       <form onSubmit={handleSubmit} className="form-container">
//         <div>
//           <label htmlFor="event-name">Event Name:</label>
//           <input type="text" id="event-name" name="name" value={formData.name} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="event-time">Event Start Time:</label>
//           <input type="time" id="event-time" name="time" value={formData.time} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="event-date">Event Date:</label>
//           <input type="text" id="event-date" name="date" placeholder="MM/DD/YY" value={formData.date} onChange={handleChange} required />
//         </div>
//         <div>
//           <label htmlFor="start-address">Starting Address:</label>
//           <input type="text" id="start-address" name="starting_point" placeholder="Enter starting point" value={formData.starting_point} ref={(ref) => {
//             if (ref && !autocompleteStartRef.current) {
//               autocompleteStartRef.current = new window.google.maps.places.Autocomplete(ref);
//               autocompleteStartRef.current.addListener("place_changed", () => handlePlaceChanged("start"));
//             }
//           }} onChange={handleChange} />
//         </div>
//         <div>
//           <label htmlFor="end-address">Ending Address:</label>
//           <input type="text" id="end-address" name="ending_point" placeholder="Enter ending point" value={formData.ending_point} ref={(ref) => {
//             if (ref && !autocompleteEndRef.current) {
//               autocompleteEndRef.current = new window.google.maps.places.Autocomplete(ref);
//               autocompleteEndRef.current.addListener("place_changed", () => handlePlaceChanged("end"));
//             }
//           }} onChange={handleChange} />
//         </div>
//         <p>Distance: {isCalculating ? "Calculating..." : distance}</p>
//         <div>
//           <label htmlFor="location">Event Location (Borough):</label>
//           <select id="location" name="location" value={formData.location} onChange={handleChange}>
//             <option value="">Select a Borough</option>
//             <option value="manhattan">Manhattan</option>
//             <option value="brooklyn">Brooklyn</option>
//             <option value="queens">Queens</option>
//             <option value="bronx">Bronx</option>
//             <option value="staten island">Staten Island</option>
//           </select>
//         </div>
//         <div>
//           <label htmlFor="event-description">Event Description:</label>
//           <textarea id="event-description" name="description" value={formData.description} onChange={handleChange}></textarea>
//         </div>
//         <div>
//           <label htmlFor="max-participants">Max Participants:</label>
//           <input type="number" id="max-participants" name="max_participants" min="1" value={formData.max_participants} onChange={handleChange} />
//         </div>
//         <button type="submit">Create Event</button>
//       </form>

//       <div className="map-container">
//         <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={startCoords || { lat: 40.7128, lng: -74.0060 }} zoom={13}>
//           {startCoords && <Marker position={startCoords} />}
//           {endCoords && <Marker position={endCoords} />}
//         </GoogleMap>
//       </div>
//     </div>
//   </LoadScript>
// );




