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

export { getBooks };
