import React from "react";
import useTable from "../../common/useTable";
import "../../common/useTable.css";

const userHeaders = [{ id: "permission", label: "Permissions" }];
const adminHeaders = [
  { id: "permission", label: "Permissions" },
  { id: "options", label: "Options" },
];

const define = (role) => {
  switch (role) {
    case "GALLERY_READ":
      return (
        <div>
          <strong>Gallery Read: </strong>navigate and view pictures.
        </div>
      );
    case "GALLERY_ADMIN":
      return (
        <div>
          <strong>Gallery Admin: </strong>administrative rights over gallery.
        </div>
      );
    case "PROFILE_ADMIN":
      return (
        <div>
          <strong>Profile Admin: </strong>administrative rights over user
          profiles.
        </div>
      );
    case "GENERAL_ADMISSION":
      return (
        <div>
          <strong>General Admision: </strong>site user.
        </div>
      );
    default:
      break;
  }
};

const Roles = ({ roles, isAdmin, add, remove }) => {
  const headers = isAdmin ? adminHeaders : userHeaders;

  const { TableContainer, TableHead } = useTable(roles, headers);

  return (
    <div>
      <button onClick={add}>Add Permission</button>
      <hr></hr>
      <TableContainer>
        <TableHead />
        <tbody>
          {roles.map((r, i) => (
            <tr key={r.id}>
              <td>{define(r.role)}</td>
              {isAdmin && (
                <td>
                  <button className="btn-alert" onClick={remove}>
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};

export default Roles;
