// map is there, distance does not show, route does not show 
import { useEffect, useState } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { getEvent } from '../adapters/event-adapter';
import EventSignUp from './EventSignUp';
import ParticipantList from './ParticipantList';
import EventDelete from './EventDelete';
import EventUpdate from './EventUpdate';
import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
import "../styles/EventDetails.css";

const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); 
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const navigate = useNavigate(); 
  const [showForm, setShowForm] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null)
  

  const handleUpdateEventClick = () => {
    setShowForm(!showForm);
  }
  // const [isAuthenticated, setIsAuthenticated] = useState(false); // State for user authentication status
  // const navigate = useNavigate(); // for redirection

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const [eventData] = await getEvent(parseInt(id));
        console.log("Fetched event data:", eventData); 
        if (eventData) {
          setEvent(eventData);
          console.log("Calculating route from:", eventData.starting_point, "to:", eventData.ending_point);
          calculateRoute(eventData.starting_point, eventData.ending_point); 
        } else {
          setError('Event not found');
        }
      } catch (error) {
        console.error("Error in fetching event:", error); 
        setError('Error fetching event details');
      } finally {
        setLoading(false);
      }
    };

    const checkAuthStatus = () => {
      const userLoggedIn = false; // Replace with actual authentication logic
      setIsAuthenticated(userLoggedIn);
    };

    fetchEvent();
    checkAuthStatus();
  }, []);

  const calculateRoute = (start, end) => {
    if (start && end && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: start,
          destination: end,
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === "OK") {
            setDirectionsResponse(result);
            const distanceText = result.routes[0].legs[0].distance.text;
            const distance = parseFloat(distanceText.split(" ")[0]);
            setEvent((prevEvent) => ({
              ...prevEvent,
              distance,
            }));
          } else {
            setError('Could not find directions. Please check the addresses.');
            console.error("Error fetching directions:", status, result);
          }
        }
      );
    }
  };

  // const handleJoinEvent = () => {
  //   if (!isAuthenticated) {
  //     navigate('/login');
  //   } else {
  //     alert('You have joined the event!');
  //   }
  // };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':'); 
    const formattedHour = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM'; 
    return `${formattedHour}:${minute} ${ampm}`;
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;

  return (
    // figure out what makes more sense to have in the card vs here
    // think max needs to be in card
    <div className="event-details">
      <div className='info'>
      <div className='card' id='card-one'>
        <LoadScript googleMapsApiKey={googleMapsApiKey}>
            <GoogleMap 
              mapContainerStyle={{ width: "100%", height: "400px" }} 
              center={{ lat: 40.7128, lng: -74.0060 }} 
              zoom={10}
            >
              {directionsResponse && (
                <DirectionsRenderer directions={directionsResponse} />
              )}
            </GoogleMap>
          </LoadScript>
        <p>Start Address: {event.starting_point}</p>
        <p>End Address: {event.ending_point}</p>
        <p>Distance: {event.distance} miles</p>
      </div>
      <div className='card' id='card-two'>
        <h2>{event.name}</h2>
        <p>Location: {event.location ? event.location.charAt(0).toUpperCase() + event.location.slice(1) : ''}</p>
        <p>Date: {event.date}</p>
        <p>Time: {formatTime(event.time)}</p>
        <p>Attending: <ParticipantList/> </p>
        <p>Description: {event.description}</p>
      {/* move to card? nice to have like 10/15 */}
        <p>Max Participants: {event.max_participants}</p>
        <EventSignUp className='button'/>
        </div>
        <EventDelete className='button'/>
      </div>
     <div>
      <h1> Update Event</h1>
      <button className='button' onClick={handleUpdateEventClick}>
        {showForm ? 'Close Form' : 'Update Event'}
      </button>
      {showForm && <EventUpdate currentEvent={currentEvent} setCurrentEvent={setCurrentEvent} />}
      </div>
    </div>
  );
};
export default EventDetails;