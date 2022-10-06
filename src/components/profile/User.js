import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import eventBus from "../../security/EventBus";
import profileService from "../../services/profileService";
import { setMessage } from "../../slices/message";
import { getProfile } from "../../slices/profile";
import ProfileView from "./ProfileView";

const User = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { profile: reduxProfile } = useSelector((state) => state.profile);
  const { users: allUsers } = useSelector((state) => state);
  const { message: userMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getUser = async (id) => {
    await profileService
      .getUserById(id)
      .then((response) => {
        setUser(response);
      })
      .catch((error) => {
        const message = error.message || error.status;

        dispatch(setMessage(message));
      });
  };

  useEffect(() => {
    if (id) {
      if (allUsers.length === 0) {
        setLoading(true);
        getUser(id);
      }

      if (allUsers.length > 0) {
        let exists = allUsers.find((u) => {
          return u.id === parseInt(id);
        });

        setUser(exists);
        setLoading(false);
      }
    } else {
      if (!reduxProfile) {
        dispatch(getProfile());
      }
      setUser(reduxProfile);
    }

    if (userMessage && userMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, id, userMessage, reduxProfile]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (loading) {
    return <Loading />;
  }

  return <>{user && <ProfileView profile={user} />}</>;
};

export default User;
