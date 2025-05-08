import React, { JSX } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: JSX.Element;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  return isLoggedIn ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;