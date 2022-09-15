import React, { Component } from "react";

import { AuthProvider } from "./auth";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { CreateBookPage } from "./pages/CreateBookPage";
import { StudentPage } from "./pages/StudentPage";
import { CreateUserPage } from "./pages/CreateUserPage";

import { MyBooks } from "./pages/MyBooks";
import { Menu } from "./components/Menu";
import { PrivateRoute } from "./components/PrivateRoute";
import { getAuthenticated } from "./localstorage/auth";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    text: "Home",
    permission: "book.index",
  },
  {
    path: "/my-books",
    element: <MyBooks />,
    text: "My Books",
    permission: "student.myBooks",
  },
  {
    path: "/create-book",
    element: <CreateBookPage />,
    text: "Create Book",
    permission: "book.create",
  },
  {
    path: "/students",
    element: <StudentPage />,
    text: "Students",
    permission: "student.returnBook",
  },
  {
    path: "/register",
    element: <CreateUserPage />,
    text: "Register User",
    permission: "user.create",
  },
];

function Navigation() {
  const auth = getAuthenticated();

  return (
    <HashRouter>
      <AuthProvider>
        <Menu />

        <Routes>
          <Route path="/login" element={<LoginPage />} />)
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={<PrivateRoute permission={route.permission} />}
              >
                <Route path={route.path} element={route.element} />
              </Route>
            );
          })}
        </Routes>
      </AuthProvider>
    </HashRouter>
  );
}

export { Navigation, routes };
