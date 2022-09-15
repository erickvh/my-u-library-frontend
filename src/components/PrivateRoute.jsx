import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { getAuthenticated } from "../localstorage/auth";
const PrivateRoute = () => {
  const isAuthenticated = getAuthenticated();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export { PrivateRoute };
