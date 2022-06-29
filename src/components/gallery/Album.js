import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import eventBus from "../../security/EventBus";

const Album = () => {
  const [loading, setLoading] = useState(false);
  const { album } = useParams();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message: userMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (userMessage && userMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, userMessage]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div>
      <h3>Album: {album}</h3>
      <hr></hr>
    </div>
  );
};

export default Album;
