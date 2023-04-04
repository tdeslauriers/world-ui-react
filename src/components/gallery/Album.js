import React, { useEffect, useState } from "react";
import "./Album.css";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import eventBus from "../../security/EventBus";
import { Buffer } from "buffer";
import { getAlbum } from "../../slices/albums";
import Loading from "../../common/Loading";

const Album = () => {
  const [loading, setLoading] = useState(true);
  const [gallery, setGallery] = useState({});
  const { album } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { albums: galleries } = useSelector((state) => state);
  const { message: albumMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (galleries.filter((g) => g.album === album).length === 0) {
      setLoading(true);
      dispatch(getAlbum(album));
    }

    if (galleries) {
      let gallery = galleries.find((a) => a.album === album);
      if (gallery) {
        let thumbs = [...gallery.thumbnails];
        thumbs.sort((a, b) => {
          if (b.date < a.date) {
            return -1;
          }
          if (b.date > a.date) {
            return 1;
          }
          return 0;
        });

        setGallery({
          ...gallery,
          thumbnails: thumbs,
        });
        setLoading(false);
      }
    }

    if (
      albumMessage &&
      albumMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, album, galleries, albumMessage]);

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (albumMessage) {
    navigate("/error", { state: { from: location } });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h3>
        Album: <strong>{gallery && gallery.album}</strong>
      </h3>
      <hr />
      <h4>
        Click on any picture to see the full size image and description/context.
      </h4>
      {gallery && gallery.thumbnails ? (
        gallery.thumbnails.map((t, i) => (
          <div className="thumbnail" key={t.filename}>
            <strong>{t.title}</strong>
            <div>{`${new Date(t.date).toLocaleDateString("en-US", {
              timeZone: "UTC",
            })}`}</div>
            <NavLink
              to={`/images/${t.filename}`}
              state={{
                album: gallery,
                albumIndex: i,
              }}
            >
              {t && t.thumbnail && (
                <img
                  id={t.filename}
                  className="thumbnail-pic"
                  alt={t.title}
                  src={`data:image/jpeg;base64, ${Buffer.from(
                    t.thumbnail
                  ).toString("base64")}`}
                />
              )}
            </NavLink>
          </div>
        ))
      ) : (
        <Loading />
      )}
    </div>
  );
};

export default Album;
