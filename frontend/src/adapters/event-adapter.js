import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

const baseUrl = '/api/events';

export const createEvent = async ({ name, date, time, location, starting_point, ending_point, description, max_participants }) => {
  return fetchHandler(baseUrl, getPostOptions({ name, date, time, location, starting_point, ending_point, description, max_participants }));
};

export const getAllEvents = async () => {
  const [events, error] = await fetchHandler(baseUrl);
  if (error) console.log(error); 
  return events || [];
};

export const getEvent = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`);
}

export const updateEvent = async ({ name, date, time, location, starting_point, ending_point, description, max_participants, eventId,userId }) => {
  return fetchHandler(`${baseUrl}/${eventId}`, getPatchOptions({  name, date, time, location, starting_point, ending_point, description, max_participants,eventId,userId   }));
}

export const deleteEvent = async (id) => {
  return fetchHandler(`${baseUrl}/${id}`, { method: 'DELETE' });
};

// import { fetchHandler, getPostOptions, getPatchOptions } from "../utils/fetchingUtils";

// const baseUrl = '/api/events';

// // export const createEvent = async ({ name, date, time, location, starting_point, ending_point, description, max_participants, distance }) => {
// //   return fetchHandler(baseUrl, getPostOptions({ name, date, time, location, starting_point, ending_point, description, max_participants, distance }));
// // };


// export const createEvent = async ({ name, date, time, location, starting_point, ending_point, description, max_participants }) => {
//   try {
//     // Calculate the distance between starting_point and ending_point
//     const distance = await getDistance(starting_point, ending_point);

//     // Create event payload including the calculated distance
//     const eventPayload = {
//       name,
//       date,
//       time,
//       location,
//       starting_point,
//       ending_point,
//       description,
//       max_participants,
//       distance, // Add the calculated distance here
//     };

//     return await fetchHandler(baseUrl, getPostOptions(eventPayload));
//   } catch (error) {
//     console.error("Error creating event:", error);
//     throw new Error('Failed to create event'); // Adjust error handling as needed
//   }
// };
// export const getAllEvents = async () => {
//   const [events, error] = await fetchHandler(baseUrl);
//   if (error) console.log(error); 
//   return events || [];
// };

// export const getEvent = async (id) => {
//   return fetchHandler(`${baseUrl}/${id}`);
// }

// export const updateEvent = async ({ name, date, time, location, starting_point, ending_point, description, max_participants, distance, eventId, userId }) => {
//   return fetchHandler(`${baseUrl}/${eventId}`, getPatchOptions({ name, date, time, location, starting_point, ending_point, description, max_participants, distance, eventId, userId }));
// }

// export const deleteEvent = async (id) => {
//   return fetchHandler(`${baseUrl}/${id}`, { method: 'DELETE' });
// };
