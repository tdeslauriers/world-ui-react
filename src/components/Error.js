import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { clearMessage } from "../slices/message";
import "./Error.css";

const Error = () => {
  const { message: reduxMessage } = useSelector((state) => state.message);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearMessage());
  }, [dispatch, reduxMessage]);

  const handleGoBack = () => {
    navigate(-2);
  };

  const handleGoHome = () => {
    navigate("/home");
  };

  return (
    <div className="error">
      <div className="alert">
        <div>What? That's not even a thing...</div>
      </div>
      <br />
      <div>Try something else, but better.</div>
      <br />
      <div>
        {location.state?.from && (
          <button className="btn-cancel btn-error" onClick={handleGoBack}>
            Go Back
          </button>
        )}

        <button className="homeBtn" onClick={handleGoHome}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default Error;
