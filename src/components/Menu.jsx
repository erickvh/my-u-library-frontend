import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getAuthenticated } from "../localstorage/auth";
import { useAuth } from "./../auth";
import { routes } from "./../Navigation";

function Menu() {
  const auth = useAuth();
  const logout = () => {
    auth.logout();
  };

  const user = auth.user || getAuthenticated();
  let permissions = [];
  if (user) permissions = user.user.permission;

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
              {routes.map(
                (route) =>
                  permissions.includes(route.permission) && (
                    <LinkContainer to={route.path} key={route.path}>
                      <Nav.Link>{route.text}</Nav.Link>
                    </LinkContainer>
                  )
              )}
            </>
          )}

          {user && (
            <Button
              variant="secondary"
              onClick={() => logout(() => history.push("/"))}
            >
              Logout
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export { Menu };
