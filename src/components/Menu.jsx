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
import { routes } from "./../Navigation";

function Menu() {
  const auth = useAuth();
  const logout = () => {
    auth.logout();
  };

  const user = auth.user;

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
          {!user && (
            <>
              <LinkContainer to="/login">
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            </>
          )}

          {user && (
            <>
              {routes.map((route) => (
                <LinkContainer to={route.path} key={route.path}>
                  <Nav.Link>{route.text}</Nav.Link>
                </LinkContainer>
              ))}
              <Button
                variant="secondary"
                onClick={() => logout(() => history.push("/"))}
              >
                Logout
              </Button>
            </>
          )}

          {/* {routes.map((route) => {
            return (
              <LinkContainer to={route.to} key={route.to}>
                <Nav.Link key={route.to}>{route.text}</Nav.Link>
              </LinkContainer>
            );
          })}
          <Button variant="secondary" onClick={logout}>
            Logout
          </Button> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export { Menu };
