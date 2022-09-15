import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../auth";
import { getAuthenticated } from "../localstorage/auth";
import { getRoles, createUser } from "../services/auth";
import { toast } from "react-toastify";
import { getGenres } from "../services/books";

function CreateBookPage() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState(null);
  const [genre, setGenre] = useState(null);
  const [genres, setGenres] = useState([]);

  const [errors, setErrors] = useState(null);

  const auth = useAuth();
  const user = auth.user || getAuthenticated();
  useEffect(() => {
    getGenres({ token: user.token }).then((data) => {
      setGenres(data);
    });
  }, []);

  const createBookSubmit = (e) => {};
  return (
    <>
      <div className="container">
        <h1 className="d-flex justify-content-center">Create user</h1>

        <div className="row">
          <Form onSubmit={createBookSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter a title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors?.title && (
                <Form.Text className="text-danger">{errors.title}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter an author"
                onChange={(e) => setAuthor(e.target.value)}
              />

              {errors?.author && (
                <Form.Text className="text-danger">{errors.author}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Published at</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter a published year"
                onChange={(e) => setPublishedYear(e.target.value)}
              />

              {errors?.published_year && (
                <Form.Text className="text-danger">
                  {errors.published_year}
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Genre</Form.Label>
              <Form.Select size="sm" onChange={(e) => setGenre(e.target.value)}>
                <option>Choose a Genre</option>
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>
                    {genre.name}
                  </option>
                ))}
              </Form.Select>
              {errors?.genre_id && (
                <Form.Text className="text-danger">
                  Genred field is required
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export { CreateBookPage };
