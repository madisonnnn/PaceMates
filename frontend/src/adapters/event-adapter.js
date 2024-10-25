import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/events';

export const createEvent = async ({ name, date, starting_point, ending_point, description, max_participants,time,location }) => {
  return fetchHandler(baseUrl, getPostOptions({ name, date, starting_point, ending_point, description, max_participants,time,location }));
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
