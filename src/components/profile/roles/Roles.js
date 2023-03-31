import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import Loading from "../../../common/Loading";
import useTable from "../../../common/useTable";
import eventBus from "../../../security/EventBus";
import { deleteRole, getRolesAll } from "../../../slices/roles";
import { removeRoleFromUsers } from "../../../slices/users";

const headers = [
  { id: "options", label: "Options", disableSorting: true },
  { id: "title", label: "Role Title" },
  { id: "role", label: "Role/Scope" },
  { id: "description", label: "Description" },
];

const Roles = () => {
  const [loading, setLoading] = useState(true);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const location = useLocation();

  const { roles: allRoles } = useSelector((state) => state);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allRoles.length) {
      setLoading(true);
      dispatch(getRolesAll());
    }

    if (allRoles.length) {
      setLoading(false);
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allRoles, reduxMessage]);

  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    allRoles,
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
              x.title.toLowerCase().includes(target.value.toLowerCase()) ||
              x.role.toLowerCase().includes(target.value.toLowerCase()) ||
              x.description.toLowerCase().includes(target.value.toLowerCase())
          );
        }
      },
    });
  };

  const handleDeleteRole = (event) => {
    event.preventDefault();

    dispatch(deleteRole(parseInt(event.target.id)))
      .unwrap()
      .then(() => {
        dispatch(removeRoleFromUsers(parseInt(event.target.id)));
      });
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div className="top-column">
        <div className="child-column">
          <h3>
            User Roles: <strong>create and edit roles globally.</strong>
          </h3>
        </div>
        <div className="child-column">
          <div className="btngroup">
            <NavLink to={"/roles/add"}>
              <button className="btn-profile">Add Role</button>
            </NavLink>
          </div>
        </div>
      </div>
      <hr />
      <ul name="notes">
        <li>Roles available for assignment in user records.</li>
        <li>
          Deleting a role removes it from all users to which it was assigned.
        </li>
      </ul>
      <input
        className="form-control"
        name="filter"
        type="text"
        placeholder="Search Roles"
        onChange={handleFilter}
      />
      <TableContainer>
        <TableHead />
        <tbody>
          {recordsAfterTableOperations().map((role) => (
            <tr key={role.id}>
              <td>
                <NavLink to={`/roles/${role.id}/edit`}>
                  <button className="btn-table">Edit</button>
                </NavLink>
                <button
                  id={role.id}
                  name="deleteRole"
                  className="btn-alert btn-table"
                  onClick={handleDeleteRole}
                >
                  Delete
                </button>
              </td>
              <td>{role.title}</td>
              <td>{role.role}</td>
              <td>{role.description}</td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};

export default Roles;
