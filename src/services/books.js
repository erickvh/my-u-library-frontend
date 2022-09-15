import { createAxios } from "../utils/createAxios";
async function getBooks({
  token = "",
  title = "",
  author = "",
  genre = "",
  page = 1,
}) {
  const axios = createAxios(token);

  try {
    const response = await axios.get(
      `/books?title=${title}&author=${author}&genre=${genre}&page=${page}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function checkoutBook({ token = "", bookId = "" }) {
  const axios = createAxios(token);

  try {
    const response = await axios.post(`/books/${bookId}/checkout`);
    console.log(response.data);
    return true;
  } catch (error) {
    console.log(error);
  }
  return false;
}

async function getMyBooks({ token = "", bookId = "" }) {
  const axios = createAxios(token);

  try {
    const response = await axios.get(`students/my-books`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
  return [];
}

async function getGenres({ token = "" }) {
  const axios = createAxios(token);
  try {
    const response = await axios.get(`/genres`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export { getBooks, checkoutBook, getMyBooks, getGenres };
