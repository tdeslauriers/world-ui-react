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
import { updateUser } from "../../slices/users";
import ProfileForm from "./ProfileForm";

const User = () => {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  const { id } = useParams();
  const [newAddresses, setNewAddresses] = useState([]);

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

  const navigate = useNavigate();
  const location = useLocation();

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
    // has none
    if (!user.addresses && newAddresses.length === 0) {
      let address = {
        id: event.target.id,
        [event.target.name]: event.target.value,
      };
      let addresses = [];
      addresses.push(address);
      setNewAddresses(addresses);
    }

    // edit newly added
    if (!user.addresses && newAddresses.length > 0) {
      let updatedNew = newAddresses.map((address) => {
        if (address.id === event.target.id) {
          return { ...address, [event.target.name]: event.target.value };
        }
        return address;
      });
      setNewAddresses(updatedNew);
    }

    // edit existing
    if (user.addresses) {
      let updated = user.addresses.map((address) => {
        if (address.id === parseInt(event.target.id)) {
          return { ...address, [event.target.name]: event.target.value };
        }
        return address;
      });
      setUser((previousUser) => ({
        ...previousUser,
        addresses: updated,
      }));
    }
  };

  const handlePhoneChange = (event) => {
    let updated =
      user.phones &&
      user.phones.map((phone) => {
        if (phone.id && phone.id === parseInt(event.target.id)) {
          return { ...phone, [event.target.name]: event.target.value };
        }

        return phone;
      });

    setUser((previousUser) => ({
      ...previousUser,
      phones: updated,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    let savedUser = user;

    savedUser.addresses &&
      newAddresses.forEach((address) => {
        let added = {
          address: address.address,
          city: address.city,
          state: address.state,
          zip: address.zip,
        };
        savedUser.addresses.push(added);
      });

    if (!savedUser.addresses) {
      savedUser.addresses = [];
      newAddresses.forEach((address) => {
        let added = {
          address: address.address,
          city: address.city,
          state: address.state,
          zip: address.zip,
        };
        savedUser.addresses.push(added);
      });
    }

    dispatch(updateUser(savedUser))
      .unwrap()
      .then(() => {
        if (location.state?.from) {
          navigate(location.state.from);
        } else navigate(`/users/${id}`);
      });
  };
  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  console.log(newAddresses);
  return (
    <ProfileForm
      profile={user}
      scopes={scopes}
      onProfileChange={handleProfileChange}
      onAddressChange={handleAddressChange}
      onPhoneChange={handlePhoneChange}
      onSave={handleSave}
    />
  );
};

export default User;
