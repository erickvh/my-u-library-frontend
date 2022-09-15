import { useEffect, useState } from "react";
import { useAuth } from "../auth";
import { getAuthenticated } from "../localstorage/auth";
import {
  getStudents,
  getBooksStudent,
  returnBookStudent,
} from "../services/students";
import Form from "react-bootstrap/Form";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function StudentPage() {
  const [students, setStudents] = useState([]);
  const [books, setBooks] = useState([]);
  const [studentId, setStudentId] = useState(null);

  const auth = useAuth();
  const user = auth.user || getAuthenticated();
  const permissions = user.user.permission;
  useEffect(() => {
    getStudents({ token: user.token }).then((data) => {
      setStudents(data);
    });
  }, []);

  const changeStudent = (e) => {
    const studentId = e.target.value;
    setStudentId(studentId);
    getBooksStudent({ token: user.token, id: studentId }).then((data) => {
      setBooks(data);
    });
  };

  const returnBook = (id) => {
    if (confirm("Are you sure you want to return this book?")) {
      returnBookStudent({
        token: user.token,
        id: studentId,
        bookId: id,
      }).then((success) => {
        alert("Book returned successfully!");

        console.log(success);
        getBooksStudent({ token: user.token, id: studentId }).then((data) => {
          setBooks(data);
        });
      });
    }
  };

  return (
    <>
      <div className="container">
        <h1 className="d-flex justify-content-center">
          Books (checkeout - returned)
        </h1>
        <div className="row justify-content-center">
          <div className="col-6">
            <Form.Select size="sm" onChange={changeStudent}>
              <option>Choose student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.first_name} {student.last_name}
                </option>
              ))}
            </Form.Select>
          </div>
        </div>
        <div className="row my-2">
          <Table striped bordered hover className="mt-3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Published date</th>
                <th>Status</th>
                <th>Stock</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.published_year}</td>
                  <td>{book.pivot.status}</td>
                  <td>{book.stock}</td>
                  <td>
                    {permissions.includes("student.returnBook") &&
                      book.pivot.status === "checked-out" && (
                        <Button
                          variant="success"
                          onClick={() => {
                            returnBook(book.id);
                          }}
                        >
                          Mark as returned
                        </Button>
                      )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
}
export { StudentPage };
