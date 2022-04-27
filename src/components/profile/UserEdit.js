import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import eventBus from "../../security/EventBus";
import profileService from "../../services/profileService";
import { setMessage } from "../../slices/message";
import { updateUser } from "../../slices/users";
import { getRolesAll } from "../../slices/roles";
import ProfileForm from "./ProfileForm";
import { getProfile, updateProfile } from "../../slices/profile";
import { commonNameChars, isNumbersOnly } from "../../common/useValidation";

const User = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [errors, setErrors] = useState({});
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
      .getUserById(id)
      .then((response) => {
        setUser(response);
        setUpAddresses(response);
        setUpPhones(response);
      })
      .catch((error) => {
        const message = error.message || error.status;
        dispatch(setMessage(message));
      });
  };

  const setUpAddresses = (user) => {
    let userAddresses = [];
    if (user.addresses) {
      userAddresses = [...user.addresses];
    }
    let toAdd = 1 - userAddresses.length;
    for (let i = 0; i < toAdd; i++) {
      userAddresses.push({ id: i, temp: true });
    }
    setUser((previousUser) => ({
      ...previousUser,
      addresses: userAddresses,
    }));
  };

  const setUpPhones = (user) => {
    let userPhones = [];
    if (user.phones) {
      userPhones = [...user.phones];
    }
    let toAdd = 3 - userPhones.length;
    for (let i = 0; i < toAdd; i++) {
      userPhones.push({ id: i, temp: true });
    }
    setUser((previousUser) => ({
      ...previousUser,
      phones: userPhones,
    }));
  };

  useEffect(() => {
    if (id) {
      if (allUsers.length === 0) {
        getUser(id);
      }

      if (allUsers.length > 0) {
        let exists = allUsers.find((u) => {
          return u.id === parseInt(id);
        });
        setUser(exists);
        setUpAddresses(exists);
        setUpPhones(exists);
      }
    }

    if (roles.length === 0 && currentUser.roles.includes("PROFILE_ADMIN")) {
      dispatch(getRolesAll());
    }

    if (location.pathname === "/profile/edit") {
      reduxProfile ? setUser(reduxProfile) : dispatch(getProfile());
    }
    if (userMessage && userMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, id, reduxProfile, userMessage]);

  useEffect(() => {
    Object.keys(errors).length === 0 && setSaveDisabled(false);
  }, [errors]);

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

      // first or last name
      default:
        if (!commonNameChars(event.target.value)) {
          setErrors((previous) => ({
            ...previous,
            [event.target.name]:
              event.target.name.replace(/\w\S*/g, function (name) {
                return (
                  name.charAt(0).toUpperCase() + name.substr(1).toLowerCase()
                );
              }) +
              "s may only include common name characters like letters, dashes, apostrophes, etc.",
          }));
          setSaveDisabled(true);
        } else {
          let cleanup = Object.assign({}, errors);
          cleanup[event.target.name] && delete cleanup[event.target.name];
          setErrors(cleanup);
        }
        setUser((previousUser) => ({
          ...previousUser,
          [event.target.name]: event.target.value,
        }));
        break;
    }
  };

  const handleAddressChange = (event) => {
    event.preventDefault();
    let updated = user.addresses.map((address) => {
      if (address.id === parseInt(event.target.id)) {
        switch (event.target.name) {
          case "removeAddress":
            return { ...address, removed: true };
          case "undoRemove":
            return { ...address, removed: false };
          default:
            return { ...address, [event.target.name]: event.target.value };
        }
      }
      return address;
    });
    setUser((previousUser) => ({
      ...previousUser,
      addresses: updated,
    }));
  };

  const handlePhoneChange = (event) => {
    event.preventDefault();
    let updated = user.phones.map((phone) => {
      if (phone.id === parseInt(event.target.id)) {
        switch (event.target.name) {
          case "removePhone":
            return { ...phone, removed: true };
          case "undoRemove":
            return { ...phone, removed: false };
          default:
            return { ...phone, [event.target.name]: event.target.value };
        }
      }
      return phone;
    });
    setUser((previousUser) => ({
      ...previousUser,
      phones: updated,
    }));
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

    // phones
    let updatedPhones = user.phones.filter(
      (phone) => phone.phone && !phone.removed
    );
    updatedPhones = updatedPhones.map((phone) => {
      phone.temp && delete phone.id;
      return phone;
    });
    updatedPhones.length > 0
      ? (savedUser.phones = updatedPhones)
      : (savedUser.phones = []);
    savedUser.phones = updatedPhones;

    // addresses
    let updatedAddresses = user.addresses.filter(
      (address) => address.address && !address.removed
    );
    updatedAddresses = updatedAddresses.map((address) => {
      address.temp && delete address.id;
      return address;
    });
    updatedAddresses.length > 0
      ? (savedUser.addresses = updatedAddresses)
      : (savedUser.addresses = []);

    if (id && currentUser.roles.includes("PROFILE_ADMIN")) {
      dispatch(updateUser(savedUser))
        .unwrap()
        .then(() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else navigate(`/users/${id}`);
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
    location.state?.from
      ? navigate(location.state.from)
      : navigate(`/users/${id}`);
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <>
      {user && (
        <ProfileForm
          profile={user}
          scopes={currentUser.roles}
          onProfileChange={handleProfileChange}
          onAddressChange={handleAddressChange}
          onPhoneChange={handlePhoneChange}
          roles={roles}
          onRoleSelect={handleRoleSelect}
          onRemoveRole={handleRemoveRole}
          saveDisabled={saveDisabled}
          onSave={handleSave}
          onCancel={handleCancel}
          errors={errors}
        />
      )}
    </>
  );
};

export default User;
