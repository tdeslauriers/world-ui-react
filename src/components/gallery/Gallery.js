import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const Gallery = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect to include EventBus

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{from: location}}/>;
  }

  return <div>Placeholder: requires scopes for access.</div>;
};

export default Gallery;
