import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation, useNavigate } from "react-router-dom";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import { getUnpublished } from "../../slices/albums";

const headers = [
  { id: "options", label: "Options" },
  { id: "filename", label: "Filename" },
  { id: "date", label: "Date" },
  { id: "published", label: "Published?" },
  { id: "thumbnail", label: "Thumbnail" },
];

const Unpublished = () => {
  const [loading, setLoading] = useState(false);
  const [unpublished, setUnpublished] = useState([]);
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { albums: reduxAlbums } = useSelector((state) => state);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reduxAlbums.length) {
      dispatch(getUnpublished());
    }

    if (
      reduxAlbums.length !== 0 &&
      !reduxAlbums.find((ra) => ra.album === "unpublished")
    ) {
      dispatch(getUnpublished());
    }

    if (
      reduxAlbums.length !== 0 &&
      reduxAlbums.find((ra) => ra.album === "unpublished")
    ) {
      const unpub = reduxAlbums.find((ra) => ra.album === "unpublished");
      setUnpublished(unpub.thumbnails);
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, reduxAlbums, unpublished]);

  const { TableContainer, TableHead } = useTable(unpublished, headers);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return (
    <div>
      <h3>Unpublished Photos/Images</h3>
      <hr />
      <TableContainer>
        <TableHead />
        <tbody>
          {unpublished.length &&
            unpublished.map((up) => (
              <tr key={up.id}>
                <td>
                  <NavLink to={`/images/${up.filename}/edit`}><button className="btn-table">Edit</button></NavLink>
                </td>
                <td>{up.filename}</td>
                <td>{`${new Date(up.date).toLocaleDateString()}`}</td>
                <td >
                  <strong className={up.published ? "success" : "alert"}>{up.published ? "Published" : "Unpublished"}</strong>
                </td>
                <td>
                  <img
                    id={up.filename}
                    className="thumbnail-pic"
                    alt={up.filename}
                    src={`data:image/jpeg;base64, ${up.thumbnail}`}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </TableContainer>
    </div>
  );
};

export default Unpublished;
