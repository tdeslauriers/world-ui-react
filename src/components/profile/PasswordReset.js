import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { ERRORS, validatePassword } from "../../common/useValidation";
import { resetPassword } from "../../slices/profile";

const PasswordReset = (props) => {
  const [resetCmd, setResetCmd] = useState({});
  const [message, setMessage] = useState(null);
  const [submitDisabled, setSubmitDisabled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {}, [dispatch, resetCmd, message]);

  const handlePasswordChange = (event) => {
    event.preventDefault();
    setResetCmd((previousResetCmd) => ({
      ...previousResetCmd,
      [event.target.name]: event.target.value,
    }));
  };

  const handlePasswordBlur = (event) => {
    event.preventDefault();

    validate(event, resetCmd, validatePassword);

    setResetCmd((previousResetCmd) => ({
      ...previousResetCmd,
      [event.target.name]: event.target.value,
    }));
  };

  // input validation
  const validate = (event, cmd, validator) => {
    event.preventDefault();

    const passwordErr = validator(event.target.value);
    if (passwordErr) {
      // returns null if no errors
      cmd.errors = {
        ...cmd.errors,
        [event.target.name]: passwordErr,
      };
      setSubmitDisabled(true);
    } else {
      cmd.errors && delete cmd.errors[event.target.name];
    }

    if (
      cmd.current &&
      cmd.current.length > 0 &&
      cmd.updated &&
      cmd.updated.length > 0 &&
      cmd.updated === cmd.current
    ) {
      cmd.errors = {
        ...cmd.errors,
        matchCurrent:
          "Your new password cannot be the same as your current password.",
      };
      setSubmitDisabled(true);
    } else {
      cmd.errors && delete cmd.errors.matchCurrent;
    }

    if (
      cmd.confirm &&
      cmd.confirm.length > 0 &&
      cmd.updated &&
      cmd.updated.length > 0 &&
      cmd.updated !== cmd.confirm
    ) {
      cmd.errors = {
        ...cmd.errors,
        matchUpdated:
          "Your confirmation password must be the same as your new password.",
      };
      setSubmitDisabled(true);
    } else {
      cmd.errors && delete cmd.errors.matchUpdated;
    }

    // remove errors if clean
    if (cmd.errors && Object.keys(cmd.errors).length === 0) {
      delete cmd.errors;
      setSubmitDisabled(false);
    }
    return cmd;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(resetPassword(resetCmd))
      .unwrap()
      .then((response) => {
        console.log(response);
        setMessage("Successfully changed password.");
        setResetCmd({});
        props.onClose(event);
      })
      .catch((error) => {
        setMessage(error.message);
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    setResetCmd({ current: "", updated: "", confirm: "" });
    setSubmitDisabled(false);
    props.onClose(event); // closes dialog
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
        onClick={handleCancel}
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
            required
            placeholder="Current Password"
            value={resetCmd.current}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          {resetCmd.errors && resetCmd.errors.current && (
            <div className="alert">{`Your current password is ${resetCmd.errors.current.substring(
              16
            )} long.`}</div>
          )}
          <hr />
          <input
            className="form-control"
            name="updated"
            type="password"
            required
            placeholder="New Password"
            value={resetCmd.updated}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          {resetCmd.errors && resetCmd.errors.updated && (
            <div className="alert">{`Your new ${resetCmd.errors.updated}.`}</div>
          )}
          {resetCmd.errors && resetCmd.errors.matchCurrent && (
            <div className="alert">{`Your new ${resetCmd.errors.matchCurrent}.`}</div>
          )}
          <input
            className="form-control"
            name="confirm"
            type="password"
            required
            placeholder="Confirm Password"
            value={resetCmd.confirm}
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
          />
          {resetCmd.errors && resetCmd.errors.confirm && (
            <div className="alert">{`Confirmation ${resetCmd.errors.confirm}.`}</div>
          )}
          {resetCmd.errors && resetCmd.errors.matchUpdated && (
            <div className="alert">{resetCmd.errors.matchUpdated}</div>
          )}
        </div>
        <button
          className="submit-reset"
          style={{ marginTop: ".5em" }}
          disabled={submitDisabled}
          onClick={handleSubmit}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default PasswordReset;
