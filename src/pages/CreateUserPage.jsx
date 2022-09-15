import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useAuth } from "../auth";
import { getAuthenticated } from "../localstorage/auth";
import { getRoles, createUser } from "../services/auth";
import { toast } from "react-toastify";

function CreateUserPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [roleId, setRole] = useState(null);
  const [roles, setRoles] = useState([]);
  const [errors, setErrors] = useState(null);
  const auth = useAuth();
  const user = auth.user || getAuthenticated();

  const createUserSubmit = (e) => {
    e.preventDefault();
    const data = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: password,
      role_id: roleId,
    };
    createUser({
      token: user.token,
      data,
    }).then((response) => {
      console.log(response);
      if (response.success) {
        toast(response.data.message);
        setErrors(null);
      } else {
        toast.error(response.data.message);
        setErrors(response.data.errors);
      }
    });
  };

  useEffect(() => {
    getRoles({ token: user.token }).then((data) => {
      setRoles(data);
    });
  }, []);

  return (
    <>
      <div className="container">
        <h1 className="d-flex justify-content-center">Create user</h1>

        <div className="row">
          <Form onSubmit={createUserSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter name"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors?.first_name && (
                <Form.Text className="text-danger">
                  {errors.first_name}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="Enter lastname"
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors?.last_name && (
                <Form.Text className="text-danger">
                  {errors.last_name}
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                required
                placeholder="Enter email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors?.email && (
                <Form.Text className="text-danger">{errors.email}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                required
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              {errors?.password && (
                <Form.Text className="text-danger">{errors.password}</Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select size="sm" onChange={(e) => setRole(e.target.value)}>
                <option>Choose a Role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
              {errors?.role_id && (
                <Form.Text className="text-danger">
                  Role field is required
                </Form.Text>
              )}
            </Form.Group>

            <Button variant="primary" type="submit">
              Create user
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
}

export { CreateUserPage };
