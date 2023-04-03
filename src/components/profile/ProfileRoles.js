import React, { useState } from "react";
import useTable from "../../common/useTable";
import "../../common/useTable.css";

const userHeaders = [
  { id: "title", label: "Permissions" },
  { id: "description", label: "Description" },
];
const adminHeaders = [
  { id: "title", label: "Permissions" },
  { id: "description", label: "Description" },
  { id: "options", label: "Options", disableSorting: true },
];

const ProfileRoles = ({ roles, isAdmin, removeRole }) => {
  // not used, just passed to useTable.
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const headers = isAdmin ? adminHeaders : userHeaders;

  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    roles,
    headers,
    filterFn
  );

  return (
    <>
      <TableContainer>
        <TableHead />
        <tbody>
          {recordsAfterTableOperations().map((r) => (
            <tr key={r.id}>
              <td>
                <strong>{r.title}</strong>
              </td>
              <td>{r.description}</td>
              {isAdmin && (
                <td>
                  <button
                    id={r.id}
                    name="remove-role"
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
