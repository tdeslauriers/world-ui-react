import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import eventBus from "../../security/EventBus";
import profileService from "../../services/profileService";
import { setMessage } from "../../slices/message";
import { updateUser } from "../../slices/users";
import { getRolesAll } from "../../slices/roles";
import ProfileForm from "./ProfileForm";
import { getProfile, updateProfile } from "../../slices/profile";
import {
  commonNameChars,
  ERRORS,
  isValidCity,
  isValidPhone,
  isValidStreet,
  isValidZip,
} from "../../common/useValidation";
import Loading from "../../common/Loading";

const UserEdit = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { uuid } = useParams();
  const [saveDisabled, setSaveDisabled] = useState(false);

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users: allUsers } = useSelector((state) => state);
  const { profile: reduxProfile } = useSelector((state) => state.profile);
  const { roles } = useSelector((state) => state);
  const { message: userMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getUser = (id) => {
    profileService
      .getUserByUuid(id)
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
      }
    }

    if (roles.length === 0 && currentUser.roles.includes("PROFILE_ADMIN")) {
      dispatch(getRolesAll());
    }

    if (location.pathname === "/profile/edit") {
      if (reduxProfile) {
        setUser(reduxProfile);
      } else {
        dispatch(getProfile());
      }
    }

    if (userMessage && userMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, uuid, reduxProfile, userMessage]);

  useEffect(() => {
    let isDisabled = false;
    if (user.errors) {
      isDisabled = true;
    }
    user.addresses &&
      user.addresses.forEach((a) => {
        if (a.errors && Object.keys(a.errors).length !== 0) {
          isDisabled = true;
        }
      });

    user.phones &&
      user.phones.forEach((p) => {
        if (p.errors && Object.keys(p.errors).length !== 0) {
          isDisabled = true;
        }
      });
    setSaveDisabled(isDisabled);
  }, [user]);

  const handleProfileChange = (event) => {
    event.preventDefault();

    switch (event.target.name) {
      case "enabled":
        setUser((previousUser) => ({
          ...previousUser,
          [event.target.name]: !previousUser.enabled,
        }));
        break;
      case "accountLocked":
        setUser((previousUser) => ({
          ...previousUser,
          [event.target.name]: !previousUser.accountLocked,
        }));
        break;
      default:
        setUser((previousUser) => ({
          ...previousUser,
          [event.target.name]: event.target.value,
        }));
        break;
    }
  };

  const handleProfileBlur = (event) => {
    event.preventDefault();
    validate(event, user, commonNameChars);
    setUser((previousUser) => ({
      ...previousUser,
      [event.target.name]: event.target.value,
    }));
  };

  const handleAddressBlur = (event) => {
    event.preventDefault();
    let validated = user.addresses.map((a) => {
      if (a.id === parseInt(event.target.id)) {
        switch (event.target.name) {
          case "address":
            validate(event, a, isValidStreet);
            break;
          case "city":
            validate(event, a, isValidCity);
            break;
          default:
            validate(event, a, isValidZip);
            break;
        }
      }
      return a;
    });
    setUser((previousUser) => ({
      ...previousUser,
      addresses: validated,
    }));
  };

  const validate = (event, x, validator) => {
    const n = event.target.name;
    const v = event.target.value;
    if (!validator(v)) {
      x.errors = {
        ...x.errors,
        [n]: ERRORS[n],
      };
      setSaveDisabled(true);
    } else {
      x.errors && delete x.errors[n];
      if (x.errors && Object.keys(x.errors).length === 0) {
        delete x.errors;
      }
    }
    return x;
  };

  const handleRoleSelect = (event) => {
    event.preventDefault();
    let updated = [];
    if (user.roles) {
      updated = [...user.roles];
    }
    let selected = roles.find((role) => role.title === event.target.value);
    if (!updated.find((r) => r.id === selected.id)) {
      updated.push(selected);
      setUser((previousUser) => ({
        ...previousUser,
        roles: updated,
      }));
    }
  };

  const handleRemoveRole = (event) => {
    event.preventDefault();
    let updated = user.roles.filter(
      (role) =>
        role !==
        user.roles.find((role) => role.id === parseInt(event.target.id))
    );
    setUser((previousUser) => ({
      ...previousUser,
      roles: updated,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    let savedUser = Object.assign({}, user);

    if (uuid && currentUser.roles.includes("PROFILE_ADMIN")) {
      dispatch(updateUser(savedUser))
        .unwrap()
        .then(() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else navigate(`/users/${uuid}`);
        });
    } else {
      dispatch(updateProfile(savedUser))
        .unwrap()
        .then(() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else navigate(`/profile`);
        });
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    location.state?.from ? navigate(location.state.from) : navigate(`/home`);
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (userMessage) {
    navigate("/error", {
      state: { from: location },
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {user && (
        <ProfileForm
          profile={user}
          scopes={currentUser.roles}
          onProfileChange={handleProfileChange}
          onProfileBlur={handleProfileBlur}
          onAddressBlur={handleAddressBlur}
          roles={roles}
          onRoleSelect={handleRoleSelect}
          onRemoveRole={handleRemoveRole}
          saveDisabled={saveDisabled}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default UserEdit;
