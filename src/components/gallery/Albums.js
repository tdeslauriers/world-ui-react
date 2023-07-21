import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { getAlbums } from "../../slices/albums";
import Loading from "../../common/Loading";
import useTable from "../../common/useTable";
import eventBus from "../../security/EventBus";

const headers = [
  { id: "options", label: "Options", disableSorting: true },
  { id: "album", label: "Album" },
  { id: "description", label: "Description" },
];
const Albums = () => {
  const [loading, setLoading] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { albums: reduxAlbums } = useSelector((state) => state);
  const { user: currentUser } = useSelector((state) => state.auth);
  const { message: reduxMessage } = useSelector((state) => state.message);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!reduxAlbums.length) {
      setLoading(true);
      dispatch(getAlbums());
    }

    if (reduxAlbums.length) {
      setLoading(false);
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, reduxAlbums, reduxMessage]);

  const { TableContainer, TableHead, recordsAfterTableOperations } = useTable(
    reduxAlbums,
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
              x.album.toLowerCase().includes(target.value.toLowerCase()) ||
              x.description.toLowerCase().includes(target.value.toLowerCase())
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
      <div className="top-column">
        <div className="child-column">
          <h3>
            Albums: <strong>create and edit albums for the gallery.</strong>
          </h3>
        </div>
        <div className="child-column">
          <div className="btngroup">
            {["GALLERY_EDIT"].some((r) => currentUser.roles.includes(r)) && (
              <NavLink to={"/albums/add"}>
                <button className="btn-profile">Add Album</button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <hr />
      <p>
        The following list of albums contain images by year, by category, or
        from a single event like vacation. Pictures may appear in more than one
        album.
      </p>
      <input
        className="form-control"
        name="filter"
        type="text"
        placeholder="Search Albums"
        onChange={handleFilter}
      />
      <TableContainer>
        <TableHead />
        <tbody>
          {recordsAfterTableOperations().map((album) => (
            <tr key={album.id}>
              <td>
                <NavLink
                  to={`/albums/${album.album}`}
                  className="btn-table"
                  replace
                  state={{ from: location }}
                >
                  <button>View</button>
                </NavLink>
                {["GALLERY_EDIT"].some((r) =>
                  currentUser.roles.includes(r)
                ) && (
                  <NavLink
                    to={`/albums/${album.album}/edit`}
                    className="btn-table"
                    replace
                    state={{ from: location }}
                  >
                    <button>Edit</button>
                  </NavLink>
                )}
              </td>
              <td>{album.album}</td>
              <td>{album.description}</td>
            </tr>
          ))}
        </tbody>
      </TableContainer>
    </div>
  );
};

export default Albums;
