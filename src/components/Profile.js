import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import eventBus from "../common/EventBus";
import { clearMessage } from "../slices/message";
import { getprofile } from "../slices/profile";

import "./Profile.css";

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const { profile: reduxProfile } = useSelector((state) => state.profile);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!reduxProfile) {
      dispatch(getprofile());
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, reduxProfile, reduxMessage]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {reduxProfile && (
        <div className="profile-record">
          <header>
            <h3>
              Profile: <strong>{reduxProfile.username}</strong>
            </h3>
          </header>
          <hr></hr>
          <div>
            Firstname: <strong>{reduxProfile.firstname}</strong>
          </div>
          <div>
            Lastname: <strong>{reduxProfile.lastname}</strong>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
