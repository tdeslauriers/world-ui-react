import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../../common/Loading";
import eventBus from "../../security/EventBus";
import { saveAlbum, updateAlbum } from "../../slices/albums";

const AlbumEdit = () => {
  const [loading, setLoading] = useState(false);
  const { albumName } = useParams();
  const [album, setAlbum] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { albums: reduxAlbums } = useSelector((state) => state);
  const { message: reduxMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (albumName && reduxAlbums.length > 0) {
      let exists = reduxAlbums.find((a) => {
        return a.album === albumName;
      });
      setAlbum(exists);
    }

    if (
      reduxMessage &&
      reduxMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, reduxAlbums, albumName, reduxMessage]);

  const handleAlbumChange = (event) => {
    event.preventDefault();
    setAlbum((previousRole) => ({
      ...previousRole,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSave = (event) => {
    event.preventDefault();

    if (album.id) {
      dispatch(
        // dont want to send thumbnails to update album endpoint
        updateAlbum({
          id: album.id,
          album: album.album,
          description: album.description,
        })
      )
        .unwrap()
        .then(() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/albums");
          }
        });
    } else {
      dispatch(saveAlbum(album))
        .unwrap()
        .then(() => {
          if (location.state?.from) {
            navigate(location.state.from);
          } else {
            navigate("/albums");
          }
        });
    }
  };

  const handleCancel = (event) => {
    location.state?.from ? navigate(location.state.from) : navigate("/albums");
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (reduxMessage) {
    navigate("/error", {
      state: { from: location },
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {album && (
        <>
          <form>
            <div className="top-column">
              <div className="child-column">
                {album.id ? (
                  <h3>
                    Edit Album: <strong>{album.album}</strong>
                  </h3>
                ) : (
                  <h3>Add Album</h3>
                )}
              </div>
              <div className="child-column">
                <div className="btngroup">
                  <button className="btn-profile" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="btn-profile btn-cancel"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
            <hr />
            <div className="gallery-form">
              <p>
                Album name must not contain spaces or special chars because it
                will be a URL param.
              </p>
              <input
                className="form-control"
                name="album"
                type="text"
                placeholder="Album Name"
                value={album.album}
                onChange={handleAlbumChange}
              />
              <input
                className="form-control"
                name="description"
                type="text"
                placeholder="Album Description"
                value={album.description}
                onChange={handleAlbumChange}
              />
            </div>
          </form>
        </>
      )}
    </>
  );
};

export default AlbumEdit;
