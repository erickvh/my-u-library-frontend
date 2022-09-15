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

export { getBooks, checkoutBook };
