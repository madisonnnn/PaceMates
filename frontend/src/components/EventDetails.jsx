// import { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom'; 
// import { getEvent } from '../adapters/event-adapter';
// import { GoogleMap, LoadScript, DirectionsService, DirectionsRenderer } from "@react-google-maps/api";
// import "../styles/EventDetails.css"

// const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// const EventDetails = () => {
//   const { id } = useParams();
//   const [event, setEvent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false); 
//   const [directionsResponse, setDirectionsResponse] = useState(null);
//   const navigate = useNavigate(); 

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const [eventData] = await getEvent(parseInt(id));
//         console.log("Fetched event data:", eventData); 
//         if (eventData) {
//           setEvent(eventData);
//           console.log("Calculating route from:", eventData.starting_point, "to:", eventData.ending_point);
//           calculateRoute(eventData.starting_point, eventData.ending_point); 
//         } else {
//           setError('Event not found');
//         }
//       } catch (error) {
//         console.error("Error in fetching event:", error); 
//         setError('Error fetching event details');
//       } finally {
//         setLoading(false);
//       }
//     };

//     const checkAuthStatus = () => {
//       const userLoggedIn = false; // Replace with actual authentication logic
//       setIsAuthenticated(userLoggedIn);
//     };

//     fetchEvent();
//     checkAuthStatus();
//   }, [id]);

//   const calculateRoute = (start, end) => {
//     if (start && end && window.google) {
//       const directionsService = new window.google.maps.DirectionsService();
//       directionsService.route(
//         {
//           origin: start,
//           destination: end,
//           travelMode: window.google.maps.TravelMode.WALKING,
//         },
//         (result, status) => {
//           if (status === "OK") {
//             setDirectionsResponse(result);
//             const distanceText = result.routes[0].legs[0].distance.text;
//             const distance = parseFloat(distanceText.split(" ")[0]);
//             setEvent((prevEvent) => ({
//               ...prevEvent,
//               distance,
//             }));
//           } else {
//             setError('Could not find directions. Please check the addresses.');
//             console.error("Error fetching directions:", status, result);
//           }
//         }
//       );
//     }
//   };

//   const handleJoinEvent = () => {
//     if (!isAuthenticated) {
//       navigate('/login');
//     } else {
//       alert('You have joined the event!');
//     }
//   };

//   const formatTime = (time) => {
//     const [hour, minute] = time.split(':'); 
//     const formattedHour = hour % 12 || 12;
//     const ampm = hour < 12 ? 'AM' : 'PM'; 
//     return `${formattedHour}:${minute} ${ampm}`;
//   };

//   if (loading) return <p>Loading event details...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="event-details">
//       <h2>{event.name}</h2>
//       <p>Start Address: {event.starting_point}</p>
//       <p>End Address: {event.ending_point}</p>
//       <p>Distance: {event.distance || 'Distance not available'} miles</p>
//       <p>Location: {event.location}</p>
//       <p>Date: {event.date}</p>
//       <p>Time: {formatTime(event.time)}</p> 
//       <p>Description: {event.description}</p>
//       <p>Max Participants: {event.max_participants}</p>

//       <LoadScript googleMapsApiKey={googleMapsApiKey}>
//         <GoogleMap 
//           mapContainerStyle={{ width: "100%", height: "400px" }} 
//           center={{ lat: 40.7128, lng: -74.0060 }} 
//           zoom={10}
//         >
//           {directionsResponse && (
//             <DirectionsRenderer directions={directionsResponse} />
//           )}
//         </GoogleMap>
//       </LoadScript>

//       <button onClick={handleJoinEvent}>
//         {isAuthenticated ? 'Join Event' : 'Login to Join'}
//       </button>
//     </div>
//   );
// };

// export default EventDetails;


import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; 
import { getEvent } from '../adapters/event-adapter';
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
  }, [id]);

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

  const handleJoinEvent = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      alert('You have joined the event!');
    }
  };

  const formatTime = (time) => {
    const [hour, minute] = time.split(':'); 
    const formattedHour = hour % 12 || 12;
    const ampm = hour < 12 ? 'AM' : 'PM'; 
    return `${formattedHour}:${minute} ${ampm}`;
  };

  if (loading) return <p>Loading event details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="event-details-container">
      <div className="map-container">
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
      </div>
      <div className="event-info">
        <h2>{event.name}</h2>
        <p>Start Address: {event.starting_point}</p>
        <p>End Address: {event.ending_point}</p>
        <p>Distance: {event.distance || 'Distance not available'} miles</p>
        <p>Location: {event.location}</p>
        <p>Date: {event.date}</p>
        <p>Time: {formatTime(event.time)}</p> 
        <p>Description: {event.description}</p>
        <p>Max Participants: {event.max_participants}</p>
        <button onClick={handleJoinEvent}>
          {isAuthenticated ? 'Join Event' : 'Login to Join'}
        </button>
      </div>
    </div>
  );
};

export default EventDetails;














