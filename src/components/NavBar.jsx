import React, { Component } from "react";
import {
  Navbar,
  NavDropdown,
  Form,
  FormControl,
  Button,
  Nav,
} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { AuthProvider } from "../auth";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";

function NavBar() {
  const routes = [];
  routes.push({
    to: "/",
    text: "Home",
  });

  routes.push({
    to: "/my-books",
    text: "books",
  });
  routes.push({
    to: "/login",
    text: "Login",
  });
  routes.push({
    to: "/logout",
    text: "Logout",
  });

  return (
    <HashRouter>
      <AuthProvider>
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
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LoginPage />} />
          <Route path="/my-books" element={<HomePage />}></Route>
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export { NavBar };
