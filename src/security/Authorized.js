import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Authorized = ({ children, allowedScopes }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  if (currentUser.roles === undefined) {
    return <Navigate to="/home" />;
  }

  const isAuthorized = allowedScopes.some((s) => currentUser.roles.includes(s));

  return isAuthorized ? children : <Navigate to="/login" />;
};

export default Authorized;
