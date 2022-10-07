import React from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Error.css";

const Error = ({ ...props }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    navigate(-2);
  };

  return (
    <div className="error">
      <div className="alert">
        <div>What? That's not even a thing...</div>
        <div>{location.state?.errorMessage}</div>
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
        <NavLink to={"/home"}>
          <button>Go Home</button>
        </NavLink>
      </div>
    </div>
  );
};

export default Error;
