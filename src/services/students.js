import { createAxios } from "../utils/createAxios";

async function getStudents({ token = "", id = null }) {
  const axios = createAxios(token);

  try {
    const response = await axios.get(`/students`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function getBooksStudent({ token = "", id = null }) {
  const axios = createAxios(token);
  try {
    const response = await axios.get(`/students/${id}/books`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function returnBookStudent({ token = "", id = null, bookId = null }) {
  const axios = createAxios(token);
  try {
    const response = await axios.post(`/students/${id}/books/${bookId}`);
    return true;
  } catch (error) {
    console.log(error);
  }
  return [];
}
export { getStudents, getBooksStudent, returnBookStudent };
