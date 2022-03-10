import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import eventBus from "../../security/EventBus";
import profileService from "../../services/profileService";
import ProfileView from "./ProfileView";

const User = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const location = useLocation();
  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users: allUsers } = useSelector((state) => state);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getUser = (id) => {
    profileService
      .getUserById(id)
      .then((response) => {
        setUser(response);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    if (allUsers.length === 0) {
      getUser(id);
    }

    if (allUsers.length > 0) {
      let exists = allUsers.find((u) => {
        return u.id === parseInt(id);
      });
      setUser(exists);
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, id, reduxMessage]);

  const scopes = currentUser != null ? currentUser.roles : [];

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      <ProfileView profile={user} scopes={scopes} />
    </>
  );
};

export default User;
