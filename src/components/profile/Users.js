import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import { getUsersAll } from "../../slices/users";

import "./Profile.css";

const headers = [
  { id: "options", label: "Options", disableSorting: true },
  { id: "username", label: "Username/Email" },
  { id: "firstname", label: "Firstname" },
  { id: "lastname", label: "Lastname" },
  { id: "dateCreated", label: "Date Created" },
  { id: "enabled", label: "Enabled?", disableSorting: true },
  { id: "accountLocked", label: "Locked?", disableSorting: true },
  { id: "accountExpired", label: "Expired?", disableSorting: true },
];

const ProfilesAll = () => {
  const [loading, setLoading] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const location = useLocation();
  const navigate = useNavigate();

  // redux
  const { users: allUsers } = useSelector((state) => state);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allUsers.length) {
      setLoading(true);
      dispatch(getUsersAll());
    }

    if (allUsers.length) {
      setLoading(false);
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allUsers, reduxMessage]);

  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    allUsers,
    headers,
    filterFn
  );

  const handleFilter = (event) => {
    event.preventDefault();

    let target = event.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          return items;
        } else {
          return items.filter(
            (x) =>
              x.username.toLowerCase().includes(target.value.toLowerCase()) ||
              x.firstname.toLowerCase().includes(target.value.toLowerCase()) ||
              x.lastname.toLowerCase().includes(target.value.toLowerCase()) ||
              x.dateCreated.toLowerCase().includes(target.value.toLowerCase())
          );
        }
      },
    });
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h3>User Profiles</h3>
      <hr />
      <input
        className="form-control"
        name="filter"
        type="text"
        placeholder="Search Users"
        onChange={handleFilter}
      />
      <TableContainer>
        <TableHead />
        <tbody>
          {recordsAfterTableOperations().map((user) => (
            <tr key={user.id}>
              <td>
                <NavLink to={`/users/${user.uuid}`}>
                  <button className="btn-table">View</button>
                </NavLink>
                <NavLink
                  to={`/users/${user.uuid}/edit`}
                  replace
                  state={{ from: location }}
                >
                  <button className="btn-table">Edit</button>
                </NavLink>
              </td>
              <td>{user.username}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
              <td>{user.dateCreated}</td>
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
