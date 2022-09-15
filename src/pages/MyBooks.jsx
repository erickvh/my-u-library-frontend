import { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import { Loading } from "../utils/Loading";
import { useAuth } from "./../auth";
import { getAuthenticated } from "../localstorage/auth";
import { getMyBooks } from "../services/books";

function MyBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const user = auth.user || getAuthenticated();

  useEffect(() => {
    getMyBooks({ token: user.token }).then((data) => {
      setBooks(data);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="d-flex justify-content-center">
          Books (checkeout - returned)
        </h1>
        <div className="row my-2">
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
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {books.map((book) => (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.published_year}</td>
                    <td>{book.pivot.status}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </div>
      </div>
    </>
  );
}

export { MyBooks };
