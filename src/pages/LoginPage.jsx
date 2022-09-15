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
      <Row className="text-center my-4">
        <Col>
          <h2>Login</h2>
        </Col>
      </Row>
      <LoginForm />
    </div>
  );
}

export { LoginPage };
