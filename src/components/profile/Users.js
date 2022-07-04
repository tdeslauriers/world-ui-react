import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import { getUsersAll } from "../../slices/users";

import "./Profile.css";

const headers = [
  { id: "options", label: "Options" },
  { id: "username", label: "Username/Email" },
  { id: "firstname", label: "Firstname" },
  { id: "lastname", label: "Lastname" },
  { id: "dateCreated", label: "Date Created" },
  { id: "enabled", label: "Enabled?" },
  { id: "accountLocked", label: "Locked?" },
  { id: "accountExpired", label: "Expired?" },
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
      <h3>User Profiles</h3>
      <hr />
      <TableContainer>
        <TableHead />
        <tbody>
          {allUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <NavLink to={`/users/${user.id}`}>
                  <button className="btn-table">View</button>
                </NavLink>
                <NavLink
                  to={`/users/${user.id}/edit`}
                  replace
                  state={{ from: location }}
                >
                  <button className="btn-table">Edit</button>
                </NavLink>
              </td>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{new Date(user.dateCreated).toLocaleDateString()}</td>
              <td>
                <strong className={user.enabled ? "success" : "alert"}>
                  {user.enabled ? "Enabled" : "Disabled"}
                </strong>
              </td>
              <td>
                <strong className={user.accountLocked ? "alert" : "success"}>
                  {user.accountLocked ? "Locked" : "Unlocked"}
                </strong>
              </td>
              <td>
                <strong className={user.accountExpired ? "alert" : "success"}>
                  {user.accountExpired ? "Expired" : "Current"}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};

export default ProfilesAll;
