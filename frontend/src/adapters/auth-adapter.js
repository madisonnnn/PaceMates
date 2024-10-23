import { fetchHandler, getPostOptions, deleteOptions } from "../utils/fetchingUtils";

const baseUrl = '/api';

export const checkForLoggedInUser = async () => {
  const [data] = await fetchHandler(`${baseUrl}/me`);
  return data;
};

export const logUserIn = async ({ email, password }) => {
  return fetchHandler(`${baseUrl}/login`, getPostOptions({ email, password }))
};

// the logout route pretty much can't fail with our setup, but if yours can, change this
export const logUserOut = async () => {
  await fetchHandler(`${baseUrl}/logout`, deleteOptions);
  return true;
};
