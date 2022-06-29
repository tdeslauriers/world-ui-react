import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Error.css";

const Error = ({ ...props }) => {
  const { isLoggedIn } = useSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();

  const handleGoBack = (event) => {
    location.state?.from ? navigate(location.state.from) : navigate(`/home`);
  };
  console.log(location);
  return (
    <div className="error">
      <div className="alert">What? That's not even a thing...</div>
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
