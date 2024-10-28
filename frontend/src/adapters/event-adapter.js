import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/events';

export const createEvent = async ({ name, date, starting_point, ending_point, description, max_participants,time,location }) => {
  return fetchHandler(baseUrl, getPostOptions({ name, date, starting_point, ending_point, description, max_participants,time,location }));
};

export const getFilteredEvents = async ({ location, distance, size }) => {
 let url = baseUrl + '?'
 let andClause = false
    if (location) {
     url += `location=${location}`;
     andClause = true;
    }

    if(distance) {
     url += andClause ? `&distance=${distance}` : `distance=${distance}`;
     andClause = true;
    }

    if(size) {
     url += andClause ?`&size=${size}` : `size=${size}`;
     }
     
     console.log("Request URL:", url);
 const [events, error] = await fetchHandler(url);
 if (error) console.log(error); 
 return events || [];
};

export const getAllEvents = async () => {
  const [events, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); 
  return events || [];
};

export const getEvent = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateEvent = async ({ name, date, starting_point, ending_point, description, max_participants,time,location, eventId,userId }) => {
  return fetchHandler(`${baseUrl}/${eventId}`, getPatchOptions({  name, date, starting_point, ending_point, description, max_participants,time,location,eventId,userId   }));
}

export const deleteEvent = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`, { method: 'DELETE' });
};
