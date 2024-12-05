
import React, { useState, useContext, useRef, useEffect } from 'react';
import { EventContext } from '../contexts/EventContext';
import { createEvent } from '../adapters/event-adapter';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "../styles/CreateEventForm.css";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
// import '../styles/EventFormStyles.css'

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

  const [startCoords, setStartCoords] = useState(null);
  const [endCoords, setEndCoords] = useState(null);
  const [distance, setDistance] = useState("Calculating...");
  const [isCalculating, setIsCalculating] = useState(true);

  const autocompleteStartRef = useRef(null);
  const autocompleteEndRef = useRef(null);
  const libraries = ["places"];

  useEffect(() => {
    if (autocompleteStartRef.current) {
      autocompleteStartRef.current.setFields(['formatted_address', 'geometry']);
    }
    if (autocompleteEndRef.current) {
      autocompleteEndRef.current.setFields(['formatted_address', 'geometry']);
    }
  }, []);

  useEffect(() => {
    if (startCoords && endCoords) {
      setIsCalculating(true);
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [startCoords],
          destinations: [endCoords],
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (response, status) => {
          if (status === "OK") {
            const distanceInMeters = response.rows[0].elements[0].distance.value;
            const distanceInMiles = (distanceInMeters * 0.000621371).toFixed(2);
            setDistance(`${distanceInMiles} miles`);
            setIsCalculating(false);
          } else {
            setDistance("Error calculating distance");
            setIsCalculating(false);
          }
        }
      );
    } else {
      setDistance("Calculating...");
      setIsCalculating(true);
    }
  }, [startCoords, endCoords]);

  const handlePlaceChanged = (type) => {
    const place = type === "start" ? autocompleteStartRef.current.getPlace() : autocompleteEndRef.current.getPlace();
    if (!place.geometry) {
      console.error("Returned place contains no geometry");
      return;
    }
    const location = place.geometry.location;

    if (type === "start") {
      setStartCoords({ lat: location.lat(), lng: location.lng() });
      setFormData((prevData) => ({ ...prevData, starting_point: place.formatted_address }));
    } else {
      setEndCoords({ lat: location.lat(), lng: location.lng() });
      setFormData((prevData) => ({ ...prevData, ending_point: place.formatted_address }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const [newEvent, error] = await createEvent({ ...formData, distance });
      if (newEvent) {
        addEvent(newEvent);
        setFormData({
          name: '',
          date: '',
          time: '',
          location: '',
          starting_point: '',
          ending_point: '',
          description: '',
          max_participants: ''
        });
        setDistance("Calculating...");
      } else {
        console.error("Error creating event:", error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <LoadScript googleMapsApiKey={googleMapsApiKey} libraries={libraries}>
      <div className="form-map-container">
        <form onSubmit={handleSubmit} className="form-container">
          <div>
            <label htmlFor="event-name">Event Name:</label>
            <input type="text" id="event-name" name="name" value={formData.name} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="event-time">Event Start Time:</label>
            <input type="time" id="event-time" name="time" value={formData.time} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="event-date">Event Date:</label>
            <input type="text" id="event-date" name="date" placeholder="MM/DD/YY" value={formData.date} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="start-address">Starting Address:</label>
            <input type="text" id="start-address" name="starting_point" placeholder="Enter starting point" value={formData.starting_point} ref={(ref) => {
              if (ref && !autocompleteStartRef.current) {
                autocompleteStartRef.current = new window.google.maps.places.Autocomplete(ref);
                autocompleteStartRef.current.addListener("place_changed", () => handlePlaceChanged("start"));
              }
            }} onChange={handleChange} />
          </div>
          <div>
            <label htmlFor="end-address">Ending Address:</label>
            <input type="text" id="end-address" name="ending_point" placeholder="Enter ending point" value={formData.ending_point} ref={(ref) => {
              if (ref && !autocompleteEndRef.current) {
                autocompleteEndRef.current = new window.google.maps.places.Autocomplete(ref);
                autocompleteEndRef.current.addListener("place_changed", () => handlePlaceChanged("end"));
              }
            }} onChange={handleChange} />
          </div>
          <p>Distance: {isCalculating ? "Calculating..." : distance}</p>
          <div>
            <label htmlFor="location">Event Location (Borough):</label>
            <select id="location" name="location" value={formData.location} onChange={handleChange}>
              <option value="">Select a Borough</option>
              <option value="manhattan">Manhattan</option>
              <option value="brooklyn">Brooklyn</option>
              <option value="queens">Queens</option>
              <option value="bronx">Bronx</option>
              <option value="staten island">Staten Island</option>
            </select>
          </div>
          <div>
            <label htmlFor="event-description">Event Description:</label>
            <textarea id="event-description" name="description" value={formData.description} onChange={handleChange}></textarea>
          </div>
          <div>
            <label htmlFor="max-participants">Max Participants:</label>
            <input type="number" id="max-participants" name="max_participants" min="1" value={formData.max_participants} onChange={handleChange} />
          </div>
          <button type="submit">Create Event</button>
        </form>

        <div className="map-container">
          <GoogleMap mapContainerStyle={{ width: '100%', height: '100%' }} center={startCoords || { lat: 40.7128, lng: -74.0060 }} zoom={11}>
            {startCoords && <Marker position={startCoords} />}
            {endCoords && <Marker position={endCoords} />}
          </GoogleMap>
        </div>
      </div>
    </LoadScript>
  );
};

export default CreateEventForm;

