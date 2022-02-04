import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const Gallery = () => {
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);

  // useEffect to include EventBus

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return <div>Placeholder: requires scopes for access.</div>;
};

export default Gallery;
