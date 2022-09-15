import React, { Component } from "react";

import { AuthProvider } from "./auth";
import { HashRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { Menu } from "./components/Menu";
import { PrivateRoute } from "./components/PrivateRoute";

const routes = [
  {
    path: "/",
    element: <HomePage />,
    text: "Home",
  },
];

function Navigation() {
  return (
    <HashRouter>
      <AuthProvider>
        <Menu />

        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact
                element={<PrivateRoute />}
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
