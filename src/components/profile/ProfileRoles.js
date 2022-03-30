import React from "react";
import useTable from "../../common/useTable";
import "../../common/useTable.css";

const userHeaders = [{ id: "permission", label: "Permissions" }];
const adminHeaders = [
  { id: "permission", label: "Permissions" },
  { id: "description", label: "Description" },
  { id: "options", label: "Options" },
];

const ProfileRoles = ({ roles, isAdmin, addRole, removeRole }) => {
  const headers = isAdmin ? adminHeaders : userHeaders;

  const { TableContainer, TableHead } = useTable(roles, headers);

  return (
    <div>
      {isAdmin && (
        <div>
          <button onClick={addRole}>Add Permission</button>
          <hr />
        </div>
      )}

      <TableContainer>
        <TableHead />
        <tbody>
          {roles.map((r, i) => (
            <tr key={r.id}>
              <td>
                <strong>{r.title}</strong>
              </td>
              <td>{r.description}</td>
              {isAdmin && (
                <td>
                  <button className="btn-alert" onClick={removeRole}>
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

export default ProfileRoles;
