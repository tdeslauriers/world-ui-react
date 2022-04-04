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

const User = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();
  const [phones, setPhones] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState({ title: "Select Role" });

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { users: allUsers } = useSelector((state) => state);
  const { roles: selectRoles } = useSelector((state) => state);
  const { message: userMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  const getUser = (id) => {
    profileService
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

  useEffect(() => {
    // set up addresses for add/edit
    // written for when mailing and billing exist
    let addresses = [];
    if (user.addresses) {
      addresses = [...user.addresses];
    }
    let toAdd = 1 - addresses.length;
    for (let i = 0; i < toAdd; i++) {
      addresses.push({ id: i, temp: true });
    }
    setAddresses(addresses);

    // set up phones for add/edit
    let phones = [];
    if (user.phones) {
      phones = [...user.phones];
    }
    toAdd = 3 - phones.length;
    for (let i = 0; i < toAdd; i++) {
      phones.push({ id: i, temp: true });
    }
    setPhones(phones);

    // set up roles for add/edit
    let roles = [];
    if (user.roles) {
      roles = [...user.roles];
    }
    setRoles(roles);
    // get roles for selection
    if (!selectRoles.length) {
      dispatch(getRolesAll());
    }
  }, [user]);

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

  const handleAddressChange = (event) => {
    let updated = addresses.map((address) => {
      if (address.id === parseInt(event.target.id)) {
        return { ...address, [event.target.name]: event.target.value };
      }
      return address;
    });
    setAddresses(updated);
  };

  const handlePhoneChange = (event) => {
    let updated = phones.map((phone) => {
      if (phone.id === parseInt(event.target.id)) {
        return { ...phone, [event.target.name]: event.target.value };
      }
      return phone;
    });
    setPhones(updated);
  };

  const handleRoleSelect = (event) => {
    let selected = selectRoles.find(
      (role) => role.title === event.target.value
    );
    setSelectedRole(selected);
  };

  const handleAddRole = (event) => {
    event.preventDefault();
    let updated = [...roles];
    if (selectedRole.title !== "Select Role") {
      updated.push(selectedRole);
      setRoles(updated);
    }
    setSelectedRole({ title: "Select Role" }); // hackery nonsense.
  };

  const handleRemoveRole = (event) => {
    event.preventDefault();
    let updated = roles.filter(
      (role) =>
        role !== roles.find((role) => role.id === parseInt(event.target.id))
    );
    setRoles(updated);
  };

  const handleSave = (event) => {
    event.preventDefault();

    let savedUser = Object.assign({}, user);

    let updatedPhones = phones.filter((phone) => phone.phone);
    updatedPhones = updatedPhones.map((phone) => {
      phone.temp && delete phone.id;
      return phone;
    });
    savedUser.phones = updatedPhones;

    let updatedAddresses = addresses.filter((address) => address.address);
    updatedAddresses = updatedAddresses.map((address) => {
      address.temp && delete address.id;
      return address;
    });
    savedUser.addresses = updatedAddresses;

    savedUser.roles = roles;

    dispatch(updateUser(savedUser))
      .unwrap()
      .then(() => {
        if (location.state?.from) {
          navigate(location.state.from);
        } else navigate(`/users/${id}`);
      });
  };

  const handleCancel = (event) =>
    location.state?.from
      ? navigate(location.state.from)
      : navigate(`/users/${id}`);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <ProfileForm
      profile={user}
      scopes={scopes}
      onProfileChange={handleProfileChange}
      addresses={addresses}
      onAddressChange={handleAddressChange}
      phones={phones}
      onPhoneChange={handlePhoneChange}
      roles={roles}
      rolesForSelect={selectRoles}
      roleSelected={selectedRole}
      onRoleSelect={handleRoleSelect}
      onAddRole={handleAddRole}
      onRemoveRole={handleRemoveRole}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
};

export default User;
