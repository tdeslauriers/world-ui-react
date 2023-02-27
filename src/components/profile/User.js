import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import eventBus from "../../security/EventBus";
import profileService from "../../services/profileService";
import { setMessage } from "../../slices/message";
import { getProfile } from "../../slices/profile";
import ProfileView from "./ProfileView";

const User = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const { uuid } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { profile: reduxProfile } = useSelector((state) => state.profile);
  const { users: allUsers } = useSelector((state) => state);
  const { message: userMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getUser = async (uuid) => {
    await profileService
      .getUserByUuid(uuid)
      .then((response) => {
        setUser(response);
        setLoading(false);
      })
      .catch((error) => {
        const message = error.message || error.status;

        dispatch(setMessage(message));
      });
  };

  useEffect(() => {
    if (uuid) {
      if (allUsers.length === 0) {
        setLoading(true);
        getUser(uuid);
      }

      if (allUsers.length > 0) {
        let exists = allUsers.find((u) => {
          return u.uuid === uuid;
        });

        setUser(exists);
        setLoading(false);
      }
    } else {
      if (!reduxProfile) {
        dispatch(getProfile());
      }
      setUser(reduxProfile);
      setLoading(false);
    }

    if (userMessage && userMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, uuid, userMessage, reduxProfile]);

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (userMessage) {
    navigate("/error");
    // navigate("/error", {
    //   state: { from: location },
    // });
  }

  if (loading) {
    return <Loading />;
  }

  return <>{user && <ProfileView profile={user} />}</>;
};

export default User;
