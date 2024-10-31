import { fetchHandler } from "../utils/fetchingUtils";

const baseUrl = `/api/events`;

export const signUp = async (id) => {
  return fetchHandler(`${baseUrl}/${id}/participants`, { method: 'POST' });
};

export const optOut = async (id) => {
  return fetchHandler(`${baseUrl}/${id}/participants`, { method: 'DELETE' });
};

export const getAllParticipants = async (id) => {
  const [participants, error] = await fetchHandler(`${baseUrl}/${id}/participants`);
  if (error) console.log(error); 
  return participants || [];
};
