import React, { useState } from "react";
import useTable from "../../common/useTable";

const headers = [
  { id: "album", label: "Album" },
  { id: "description", label: "Description" },
  { id: "options", label: "Options", disableSorting: true },
];

const ImageAlbums = ({ albums, removeAlbum }) => {
  // not used, just passed to useTable.
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    albums,
    headers,
    filterFn
  );
  return (
    <>
      <TableContainer>
        <TableHead />
        <tbody>
          {recordsAfterTableOperations().map((a) => (
            <tr key={a.id}>
              <td>
                <strong>{a.album}</strong>
              </td>
              <td>{a.description}</td>
              <td>
                <button
                  id={a.id}
                  name="remove-album"
                  className={albums.length <= 1 ? "btn-disabled" : "btn-alert"}
                  disabled={albums.length <= 1 ? true : false}
                  onClick={removeAlbum}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </>
  );
};

export default ImageAlbums;
