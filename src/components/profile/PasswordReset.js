import React from "react";

const PasswordReset = () => {
  return (
    <div>
      <form>
        <h3>Password Reset</h3>
        <div className="profile-form">
          <input
            className="form-control"
            name="current-password"
            type="password"
            placeholder="Current Password"
          />
          <hr />
          <input
            className="form-control"
            name="new-password"
            type="password"
            placeholder="New Password"
          />
          <input
            className="form-control"
            name="confirm-password"
            type="password"
            placeholder="Confirm Password"
          />
        </div>
      </form>
      <button>Submit</button>
    </div>
  );
};

export default PasswordReset;
