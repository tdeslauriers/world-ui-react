import React, { useEffect, useState } from "react";
import "./Album.css";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, NavLink, useLocation, useParams } from "react-router-dom";
import eventBus from "../../security/EventBus";

import { getAlbum } from "../../slices/albums";
import { setMessage } from "../../slices/message";

const Album = () => {
  const [loading, setLoading] = useState(false);
  const [gallery, setGallery] = useState({});
  const { album } = useParams();
  const location = useLocation();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { albums: galleries } = useSelector((state) => state);
  const { message: userMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (galleries.filter((g) => g.album === album).length === 0) {
      dispatch(getAlbum(album));
    }

    setGallery(galleries.find((g) => g.album === album));

    if (galleries) {
      const g = galleries.find((a) => a.album === album);
      setGallery(g);
    }

    if (userMessage && userMessage === "Request failed with status code 401") {
      eventBus.dispatch("logout");
    }
  }, [dispatch, album, galleries, userMessage]);

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <div>
      <h3>
        Album: <strong>{gallery && gallery.album}</strong>
      </h3>
      <hr></hr>
      <h4>Click on any picture to see the full size image.</h4>
      {gallery &&
        gallery.thumbnails &&
        gallery.thumbnails.map((t) => (
          <div className="thumbnail" key={t.filename}>
            <strong>{t.title}</strong>
            <div>{`${new Date(t.date).toLocaleDateString()}`}</div>
            <NavLink to={`/images/${t.filename}`} >
              <img
                id={t.filename}
                className="thumbnail-pic"
                alt={t.title}
                src={`data:image/jpeg;base64, ${t.thumbnail}`}
              />
            </NavLink>
            <p>{t.description && t.description}</p>
          </div>
        ))}
    </div>
  );
};

export default Album;
