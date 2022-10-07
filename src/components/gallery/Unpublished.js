import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";
import { getUnpublished } from "../../slices/unpublished";

const headers = [
  { id: "options", label: "Options" },
  { id: "filename", label: "Filename" },
  { id: "date", label: "Date" },
  { id: "published", label: "Published?" },
  { id: "thumbnail", label: "Thumbnail" },
];

const Unpublished = () => {
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { unpublished: reduxUnpublished } = useSelector((state) => state);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reduxUnpublished.unpublishedImages) {
      setLoading(true);
      dispatch(getUnpublished());
    }
    setLoading(false);

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, reduxMessage, reduxUnpublished]);

  const { TableContainer, TableHead } = useTable(
    reduxUnpublished.unpublishedImages,
    headers
  );

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (reduxMessage) {
    navigate("/error", {
      state: { from: location, errorMessage: reduxMessage },
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h3>Unpublished Photos/Images</h3>
      <hr />
      {reduxUnpublished.unpublishedImages &&
      reduxUnpublished.unpublishedImages.length ? (
        <TableContainer>
          <TableHead />
          <tbody>
            {reduxUnpublished.unpublishedImages.map((up) => (
              <tr key={up.id}>
                <td>
                  <NavLink
                    to={`/images/${up.filename}/edit`}
                    className="btn-table"
                    replace
                    state={{ from: location }}
                  >
                    <button>Edit</button>
                  </NavLink>
                </td>
                <td>{up.filename}</td>
                <td>{`${new Date(up.date).toLocaleDateString()}`}</td>
                <td>
                  <strong className={up.published ? "success" : "alert"}>
                    {up.published ? "Published" : "Unpublished"}
                  </strong>
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
      ) : (
        <div>None.</div>
      )}
    </div>
  );
};

export default Unpublished;
