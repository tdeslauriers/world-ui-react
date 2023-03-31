import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Loading from "../../common/Loading";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";

import { deleteImage } from "../../slices/images";
import {
  getUnpublished,
  removeFromUnpublished,
} from "../../slices/unpublished";
import "./Image.css";
import { Buffer } from "buffer";

const headers = [
  { id: "options", label: "Options", disableSorting: true },
  { id: "filename", label: "Filename" },
  { id: "date", label: "Date" },
  { id: "published", label: "Visibility", disableSorting: true },
  { id: "thumbnail", label: "Thumbnail", disableSorting: true },
];

const Unpublished = () => {
  const [loading, setLoading] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

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

  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    reduxUnpublished.unpublishedImages,
    headers,
    filterFn
  );

  const handleDelete = (event) => {
    event.preventDefault();
    const deleted = reduxUnpublished.unpublishedImages.find(
      (up) => up.id === parseInt(event.target.id)
    );
    dispatch(deleteImage(deleted.filename))
      .unwrap()
      .then(() => {
        dispatch(removeFromUnpublished(deleted));
      });
  };

  const handleFilter = (event) => {
    event.preventDefault();

    let target = event.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") {
          console.log(items);
          return items;
        } else {
          return items.filter(
            (x) =>
              x.filename.toLowerCase().includes(target.value.toLowerCase()) ||
              x.date.toLowerCase().includes(target.value.toLowerCase())
          );
        }
      },
    });
  };

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
      <input
        className="form-control"
        name="filter"
        type="text"
        placeholder="Search Unpublished Photos"
        onChange={handleFilter}
      />
      {reduxUnpublished.unpublishedImages &&
      reduxUnpublished.unpublishedImages.length ? (
        <TableContainer>
          <TableHead />
          <tbody>
            {recordsAfterTableOperations().map((up) => (
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
                  <button
                    id={up.id}
                    filename={up.filename}
                    name="deleteImage"
                    className="btn-table btn-alert"
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </td>
                <td>{up.filename}</td>
                <td>{up.date}</td>
                <td>
                  <strong className={up.published ? "success" : "alert"}>
                    {up.published ? "Published" : "Unpublished"}
                  </strong>
                </td>
                <td>
                  {up && up.thumbnail && (
                    <img
                      id={up.filename}
                      className="thumbnail-pic"
                      alt=""
                      src={`data:image/jpeg;base64, ${Buffer.from(
                        up.thumbnail
                      ).toString("base64")}`}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TableContainer>
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Unpublished;
