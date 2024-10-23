import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/events';

export const createEvent = async ({ title, date, time, startAddress, endAddress, location, description, maxParticipants }) => {
  return fetchHandler(baseUrl, getPostOptions({ title, date, time, startAddress, endAddress, location, description, maxParticipants }));
};

export const getAllEvents = async () => {
  const [events, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); 
  return events || [];
};

export const getEvent = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateEvent = async ({ id, title, date, time, startAddress, endAddress, location, description, maxParticipants }) => {
  return fetchHandler(`${baseUrl}/${id}`, getPatchOptions({ id, title, date, time, startAddress, endAddress, location, description, maxParticipants }));
}

export const deleteEvent = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`, { method: 'DELETE' });
};
