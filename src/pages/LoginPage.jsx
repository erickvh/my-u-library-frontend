import { LoginForm } from "../components/LoginForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function LoginPage() {
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
