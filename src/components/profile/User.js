import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import eventBus from "../../security/EventBus";
import profileService from "../../services/profileService";
import ProfileForm from "./ProfileForm";
import ProfileView from "./ProfileView";

const User = ({ isEditMode }) => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const location = useLocation();
  const { id } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users: allUsers } = useSelector((state) => state);
  const { message: userMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getUser = async (id) => {
    await profileService
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

    if (userMessage && userMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, id, userMessage]);

  const scopes = currentUser != null ? currentUser.roles : [];

  const handleProfileChange = (event) => {
    if (event.target.name === "enabled") {
      setUser((previousUser) => ({
        ...previousUser,
        [event.target.name]: !previousUser.enabled,
      }));
    } else if (event.target.name === "accountLocked") {
      setUser((previousUser) => ({
        ...previousUser,
        [event.target.name]: !previousUser.accountLocked,
      }));
    } else {
      setUser((previousUser) => ({
        ...previousUser,
        [event.target.name]: event.target.value,
      }));
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      {isEditMode ? (
        <ProfileForm
          profile={user}
          scopes={scopes}
          onProfileChange={handleProfileChange}
        />
      ) : (
        <ProfileView profile={user} scopes={scopes} />
      )}
    </>
  );
};

export default User;
