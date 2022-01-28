import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { getprofile } from "../slices/profile";

import "./Profile.css";

const Profile = () => {
  const [loading, setLoading] = useState(false);

  const { profile: reduxProfile } = useSelector((state) => state.profile);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (reduxProfile === undefined) {
      dispatch(getprofile());
    }
  }, [dispatch, reduxProfile]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      {reduxProfile !== undefined && (
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
      <Link to="/home">home</Link>
    </div>
  );
};

export default Profile;
