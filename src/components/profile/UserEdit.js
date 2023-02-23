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
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [dobMonth, setDobMonth] = useState(null);
  const [dobDay, setDobDay] = useState(null);
  const [dobYear, setDobYear] = useState(null);
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
        if (response.birthday) {
          setDOB(response.birthday);
        }
        setLoading(false);
      })
      .catch((error) => {
        const message = error.message || error.status;
        dispatch(setMessage(message));
      });
  };

  const setDOB = (dob) => {
    if (dob) {
      setDobMonth(dob.slice(5, 7));
      setDobDay(dob.slice(8));
      setDobYear(dob.slice(0, 4));
    }
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
        // birthday
        setUser(exists);
        if (exists.birthday) {
          setDOB(exists.birthday);
        }
        setLoading(false);
      }
    }

    if (roles.length === 0 && currentUser.roles.includes("PROFILE_ADMIN")) {
      dispatch(getRolesAll());
    }

    if (location.pathname === "/profile/edit") {
      if (reduxProfile) {
        setUser(reduxProfile);
        if (reduxProfile.birthday) {
          setDOB(reduxProfile.birthday);
        }
        setLoading(false);
      } else {
        dispatch(getProfile());
      }
    }

    if (userMessage && userMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, uuid, reduxProfile, userMessage]);

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

  const handleDobChange = (event) => {
    event.preventDefault();
    switch (event.target.name) {
      case "month":
        setDobMonth(event.target.value);
        break;
      case "day":
        setDobDay(event.target.value);
        break;
      default:
        setDobYear(event.target.value);
        break;
    }
  };

  const handleDobRemove = (event) => {
    event.preventDefault();
    setDobMonth(null);
    setDobDay(null);
    setDobYear(null);
    setUser((previousUser) => ({
      ...previousUser,
      birthday: null,
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
    if (dobMonth && dobDay && dobYear) {
      const dob = dobYear
        .concat("-")
        .concat(dobMonth)
        .concat("-")
        .concat(dobDay);
      savedUser.birthday = dob;
    }

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
          dobMonth={dobMonth}
          dobDay={dobDay}
          dobYear={dobYear}
          onDobSelect={handleDobChange}
          onRemoveDob={handleDobRemove}
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
          pwResetAllowed={uuid ? false : true}
        />
      )}
    </>
  );
};

export default UserEdit;
