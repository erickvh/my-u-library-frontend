import React from "react";

import { Navigate, Outlet } from "react-router-dom";
import { getAuthenticated } from "../localstorage/auth";
const PrivateRoute = ({ permission }) => {
  const auth = getAuthenticated();
  let permissions = [];
  if (auth) permissions = auth.user.permission;

  return auth && permissions.includes(permission) ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export { PrivateRoute };
