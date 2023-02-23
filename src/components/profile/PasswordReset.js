import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import profileService from "../../services/profileService";
import { resetPassword } from "../../slices/profile";

const PasswordReset = (props) => {
  const [current, setCurrent] = useState(null);
  const [updated, setUpdated] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [message, setMessage] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch]);

  const handlePasswordFieldChange = (event) => {
    switch (event.target.name) {
      case "current":
        setCurrent(event.target.value);
        break;
      case "updated":
        setUpdated(event.target.value);
        break;
      default:
        setConfirm(event.target.value);
        break;
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(resetPassword({ current, updated, confirm }))
      .unwrap()
      .then((response) => {
        console.log(response);
        setMessage("Successfully changed password.");
        setCurrent("");
        setUpdated("");
        setConfirm("");
        props.onClose(event);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  return (
    <>
      <button
        className="btn-cancel modal-close"
        name="close-reset-password"
        style={{ float: "right" }}
        onClick={props.onClose}
      >
        Cancel
      </button>
      <form>
        <h3>Password Reset:</h3>
        {message && (
          <div
            className={
              message === "Successfully changed password." ? "success" : "alert"
            }
          >
            {message}
          </div>
        )}
        <div className="profile-form">
          <input
            className="form-control"
            name="current"
            type="password"
            placeholder="Current Password"
            value={current}
            onChange={handlePasswordFieldChange}
          />
          <hr />
          <input
            className="form-control"
            name="updated"
            type="password"
            placeholder="New Password"
            value={updated}
            onChange={handlePasswordFieldChange}
          />
          <input
            className="form-control"
            name="confirm"
            type="password"
            placeholder="Confirm Password"
            value={confirm}
            onChange={handlePasswordFieldChange}
          />
        </div>
        <button
          className="submit-reset"
          style={{ marginTop: ".5em" }}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default PasswordReset;
