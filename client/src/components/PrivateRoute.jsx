// PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import AuthService from "../utils/auth";

const PrivateRoute = ({ element }) => {
  return AuthService.loggedIn() ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
