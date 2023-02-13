import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Authorized = ({ children, allowedScopes }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  // if (currentUser.roles === undefined) {
  //   return <Navigate to="/home" />;
  // }

  const isAuthorized = allowedScopes.some((s) => currentUser.roles.includes(s));

  return isAuthorized ? (
    children
  ) : (
    <Navigate to="/error" replace state={{ from: location }} />
  );
};

export default Authorized;
