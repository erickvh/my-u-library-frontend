import { useAuth } from "../auth";
import Table from "react-bootstrap/Table";
import { useEffect, useState } from "react";
import { getBooks } from "../services/books";
import { Loading } from "../utils/Loading";
import { Form, Button } from "react-bootstrap";
import { getAuthenticated } from "../localstorage/auth";

function HomePage() {
  const auth = useAuth();
  const user = auth.user || getAuthenticated();
  const permissions = user.user.permission;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    getBooks({ token: user.token }).then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  const search = () => {
    getBooks({ token: user.token, title, author, genre }).then((data) => {
      setBooks(data);
      setLoading(false);
    });
  };

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center">Books</h1>
      <div className="row my-2">
        <div className="col-3">
          <Form.Group controlId="formBasicSearch" className="d-flex flex-row">
            <Form.Control
              type="search"
              placeholder="Entera title"
              style={{ marginRight: "1rem" }}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-3">
          <Form.Group controlId="formBasicSearch" className="d-flex flex-row">
            <Form.Control
              type="search"
              placeholder="Enter an author"
              style={{ marginRight: "1rem" }}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </Form.Group>
        </div>
        <div className="col-3">
          <Form.Group controlId="formBasicSearch" className="d-flex flex-row">
            <Form.Control
              type="search"
              placeholder="Enter a Genre"
              style={{ marginRight: "1rem" }}
              onChange={(e) => setGenre(e.target.value)}
            />
          </Form.Group>
        </div>

        <div className="col-3">
          <Button
            variant="info"
            onClick={async () => {
              await search();
            }}
          >
            Search
          </Button>
        </div>
      </div>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Loading type={"spin"} color={"#0000ff"} />
        </div>
      ) : (
        <Table striped bordered hover className="mt-3">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published date</th>
              <th>Genre</th>
              <th>Stock</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {books.data.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.published_year}</td>
                <td>{book.genre.name}</td>
                <td>{book.stock}</td>
                <td>
                  {permissions.includes("book.checkout") && (
                    <Button variant="success">Checkout</Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export { HomePage };
