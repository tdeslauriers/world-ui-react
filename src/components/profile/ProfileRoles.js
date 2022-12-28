import React, { useEffect, useState } from "react";
import useTable from "../../common/useTable";
import "../../common/useTable.css";

const userHeaders = [
  { id: "permission", label: "Permissions" },
  { id: "description", label: "Description" },
];
const adminHeaders = [
  { id: "permission", label: "Permissions" },
  { id: "description", label: "Description" },
  { id: "options", label: "Options" },
];

const ProfileRoles = ({ roles, isAdmin, removeRole }) => {
  const headers = isAdmin ? adminHeaders : userHeaders;

  const { TableContainer, TableHead } = useTable(roles, headers);

  return (
    <>
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
                  <button
                    id={r.id}
                    className={
                      r.title === "General Admission"
                        ? "btn-disabled"
                        : "btn-alert"
                    }
                    disabled={r.title === "General Admission" ? true : false}
                    onClick={removeRole}
                  >
                    Remove
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </>
  );
};

export default ProfileRoles;
