import { useAuth } from "../auth";
import Table from "react-bootstrap/Table";
import { useCallback, useEffect, useState } from "react";
import { getBooks, checkoutBook } from "../services/books";
import { Loading } from "../utils/Loading";
import { Form, Button } from "react-bootstrap";
import { getAuthenticated } from "../localstorage/auth";
import { CustomPagination } from "../components/CustomPagination";

function HomePage() {
  const auth = useAuth();
  const user = auth.user || getAuthenticated();
  const permissions = user.user.permission;

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleChangePage = useCallback((page) => {
    setPage(page);
  }, []);

  useEffect(() => {
    getBooks({ token: user.token, title, author, genre, page }).then((data) => {
      setBooks(data);
      setTotalPages(data.last_page);
      setLoading(false);
    });
  }, [page, title, author, genre]);

  const search = () => {
    setLoading(true);
    setPage(1);
    getBooks({ token: user.token, title, author, genre, page }).then((data) => {
      setTotalPages(data.last_page);
      setLoading(false);
    });
  };

  const checkout = (id) => {
    if (confirm("Are you sure you want to checkout this book?")) {
      checkoutBook({ token: user.token, bookId: id }).then((data) => {
        alert("Book checked out successfully!");
        search();
      });
    }
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
                    <Button
                      variant="success"
                      onClick={() => {
                        checkout(book.id);
                      }}
                    >
                      Checkout
                    </Button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <div className="d-flex justify-content-center">
        {totalPages > 1 && loading == false && (
          <CustomPagination
            className="justify-content-center"
            total={totalPages}
            current={page}
            onChangePage={handleChangePage}
          />
        )}
      </div>
    </div>
  );
}

export { HomePage };
