import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import { getUsersAll } from "../../slices/users";

import "./Profile.css";

const headers = [
  { id: "username", label: "Username/Email" },
  { id: "firstname", label: "Firstname" },
  { id: "lastname", label: "Lastname" },
  { id: "dateCreated", label: "Date Created" },
  { id: "enabled", label: "Enabled?" },
  { id: "accountExpired", label: "Account Expired?" },
  { id: "accountLocked", label: "Account Locked?" },
  { id: "options", label: "Options" },
];

const ProfilesAll = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  // redux
  const { users: allUsers } = useSelector((state) => state);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers.length) {
      dispatch(getUsersAll());
    }
    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, reduxMessage]);

  const { TableContainer, TableHead } = useTable(allUsers, headers);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div>
      <h3>User Table</h3>
      <TableContainer>
        <TableHead />
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{new Date(user.dateCreated).toLocaleDateString()}</td>
              <td>{user.enabled.toString()}</td>
              <td>{user.accountExpired.toString()}</td>
              <td>{user.accountLocked.toString()}</td>
              <td>
                <NavLink to={`/users/${user.id}`}>
                  <button className="btngroup">Edit</button>
                </NavLink>
                <button className="btngroup">Disable</button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};

export default ProfilesAll;
