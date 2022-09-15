import { createAxios } from "../utils/createAxios";

async function getRoles({ token = "", id = null }) {
  const axios = createAxios(token);

  try {
    const response = await axios.get(`/roles`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function createUser({ token = "", data = {} }) {
  const axios = createAxios(token);

  try {
    const response = await axios.post(`/register`, data);
    return { success: true, data: response.data };
  } catch (error) {
    if (error.response.status === 422) {
      return { success: false, data: error.response.data };
    }
  }
  return [];
}

export { getRoles, createUser };
