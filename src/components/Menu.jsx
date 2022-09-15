import { routes } from "../routes";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useAuth } from "./../auth";
function Menu() {
  const auth = useAuth();
  const logout = () => {
    auth.logout();
  };

  return (
    <Navbar bg="dark" variant={"dark"} expand="lg">
      <Navbar.Brand href="#">My U Library</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "100px" }}
          navbarScroll
        >
          {routes.map((route) => {
            return (
              <LinkContainer to={route.to} key={route.to}>
                <Nav.Link key={route.to}>{route.text}</Nav.Link>
              </LinkContainer>
            );
          })}
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export { Menu };
