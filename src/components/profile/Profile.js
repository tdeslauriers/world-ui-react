import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import eventBus from "../../security/EventBus";
import { getProfile } from "../../slices/profile";
import ProfileView from "./ProfileView";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const { id } = useParams();

  const { profile: reduxProfile } = useSelector((state) => state.profile);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reduxProfile) {
      dispatch(getProfile());
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, reduxProfile, reduxMessage]);

  const scopes = currentUser != null ? currentUser.roles : [];

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div>
      <ProfileView profile={reduxProfile} scopes={scopes} />
    </div>
  );
};

export default Profile;
