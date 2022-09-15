import { LoginForm } from "../components/LoginForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useAuth } from "../auth";
import { Navigate } from "react-router-dom";

function LoginPage() {
  const auth = useAuth();

  if (auth.user) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <div className="row text-center my-3">
        <Col>
          <h2>Login</h2>
        </Col>
      </div>

      <div className="row justify-content-center">
        <div className="col-4">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export { LoginPage };
