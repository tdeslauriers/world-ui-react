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
import {
  commonNameChars,
  ERRORS,
  isValidCity,
  isValidPhone,
  isValidStreet,
  isValidZip,
} from "../../common/useValidation";

const User = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
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
      user.phones.forEach((p) => {
        userPhones.push(Object.assign({}, p));
      });
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

  const handleAddressChange = (event) => {
    event.preventDefault();
    let updated = user.addresses.map((a) => {
      if (a.id === parseInt(event.target.id)) {
        switch (event.target.name) {
          case "removeAddress":
            return { ...a, removed: true };
          case "undoRemove":
            return { ...a, removed: false };
          default:
            return { ...a, [event.target.name]: event.target.value };
        }
      }
      return a;
    });
    setUser((previousUser) => ({
      ...previousUser,
      addresses: updated,
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

  const handlePhoneChange = (event) => {
    event.preventDefault();
    let updated = user.phones.map((phone) => {
      if (phone.id === parseInt(event.target.id)) {
        switch (event.target.name) {
          case "removePhone":
            return { ...phone, undoType: phone.type, type: "", removed: true };
          case "undoRemove":
            return { ...phone, removed: false, type: phone.undoType };
          default:
            return { ...phone, [event.target.name]: event.target.value };
        }
      }
      return phone;
    });
    // moving validation to here from blur; better ui experience.
    updated.map((p) => {
      let dupeTypes = updated.filter(
        (phone) => phone.type === p.type && phone.type
      );
      if (dupeTypes.length > 1) {
        p.errors = { ...p.errors, type: ERRORS.phoneType };
      } else {
        p.errors && delete p.errors.type;
      }

      return p;
    });
    setUser((previousUser) => ({
      ...previousUser,
      phones: updated,
    }));
  };

  const handlePhoneBlur = (event) => {
    event.preventDefault();
    let validated = user.phones.map((p) => {
      if (p.id === parseInt(event.target.id)) {
        switch (event.target.name) {
          case "phone":
            validate(event, p, isValidPhone);
            break;
          default:
            let dupe = user.phones.filter(
              (phone) => phone.type === p.type && phone.type
            );
            if (dupe.length > 1) {
              p.errors = {
                ...p.errors,
                type: ERRORS.phoneType,
              };
              setSaveDisabled(true);
            }
            break;
        }
      }
      return p;
    });
    setUser((previousUser) => ({
      ...previousUser,
      phones: validated,
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
          onProfileBlur={handleProfileBlur}
          onAddressChange={handleAddressChange}
          onAddressBlur={handleAddressBlur}
          onPhoneChange={handlePhoneChange}
          onPhoneBlur={handlePhoneBlur}
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

export default User;
