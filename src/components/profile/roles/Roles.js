import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation } from "react-router-dom";
import useTable from "../../../common/useTable";
import eventBus from "../../../security/EventBus";
import { getRolesAll } from "../../../slices/roles";

const headers = [
  { id: "options", label: "Options" },
  { id: "title", label: "Role Title" },
  { id: "role", label: "Role/Scope" },
  { id: "description", label: "Description" },
];

const Roles = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const { roles: allRoles } = useSelector((state) => state);
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!allRoles.length) {
      dispatch(getRolesAll());
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, allRoles, reduxMessage]);

  const { TableContainer, TableHead } = useTable(allRoles, headers);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div>
      <h3>User Roles</h3>
      <TableContainer>
        <TableHead />
        <tbody>
          {allRoles.map((role) => (
            <tr key={role.id}>
              <td>
                <NavLink to={`/roles/${role.id}/edit`}>
                  <button className="btn-table">Edit</button>
                </NavLink>
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
