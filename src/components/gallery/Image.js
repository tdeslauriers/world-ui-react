import React, { useEffect, useState } from "react";
import "./Image.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  NavLink,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getImage } from "../../slices/images";
import eventBus from "../../security/EventBus";
import ProgressiveImage from "react-progressive-graceful-image";

const Image = () => {
  const [loading, setLoading] = useState(false);
  const { filename } = useParams();
  const [picture, setPicture] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  // redux
  const { isLoggedIn } = useSelector((state) => state.auth);
  const { images: reduxImages } = useSelector((state) => state);

  const { message: imageMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!reduxImages.length) {
      dispatch(getImage(filename));
    }

    if (reduxImages.length) {
      const p = reduxImages.find((i) => i.filename === filename);
      if (p) {
        setPicture(p);
      } else {
        dispatch(getImage(filename));
      }
    }

    if (
      imageMessage &&
      imageMessage === "Request failed with status code 401"
    ) {
      eventBus.dispatch("logout");
    }
  }, [dispatch, filename, reduxImages, imageMessage]);

  const handleReturnToAlbum = (event) => {
    event.preventDefault();
    if (location.state?.album) {
      navigate(`/albums/${location.state.album.album}`);
    }
  };

  const handleNext = (event) => {
    event.preventDefault();
    if (location.state?.album) {
      if (location.state.albumIndex < location.state.album.thumbnails.length) {
        navigate(
          `/images/${
            location.state.album.thumbnails[location.state.albumIndex + 1]
              .filename
          }`,
          {
            state: {
              album: location.state.album,
              albumIndex: location.state.albumIndex + 1,
            },
          }
        );
      }
    }
  };

  const handlePrevious = (event) => {
    event.preventDefault();
    if (location.state?.album) {
      if (location.state.albumIndex > 0) {
        navigate(
          `/images/${
            location.state.album.thumbnails[location.state.albumIndex - 1]
              .filename
          }`,
          {
            state: {
              album: location.state.album,
              albumIndex: location.state.albumIndex - 1,
            },
          }
        );
      }
    }
  };

  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  console.log(location.state);
  return (
    <div>
      {picture && (
        <>
          <div className="top-column">
            <div className="child-column">
              <div className="album-nav">
                <button
                  className={
                    location.state?.album
                      ? "btn-cancel img-button"
                      : "btn-disabled img-button"
                  }
                  disabled={location.state?.album.album ? false : true}
                  onClick={handleReturnToAlbum}
                >
                  Return to {location.state?.album.album} album
                </button>
              </div>
            </div>
            <div className="child-column">
              <div className="btngroup">
                <div
                  style={{
                    float: "left",
                    color: "#82CA82",
                    padding: ".5em 1em",
                  }}
                >
                  Navigate album:
                </div>
                <button
                  className="img-button"
                  onClick={handlePrevious}
                  disabled={location.state?.albumIndex ? false : true}
                >
                  Previous
                </button>
                <button
                  className="img-button"
                  onClick={handleNext}
                  disabled={
                    location.state?.albumIndex + 1 <
                    location.state?.album.thumbnails.length
                      ? false
                      : true
                  }
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <hr />
          <h3>
            <strong>{picture.title ? `${picture.title}: ` : null}</strong>
            {picture.date && new Date(picture.date).toLocaleDateString()}
          </h3>
          <h4>{picture.description && picture.description}</h4>
          <ProgressiveImage
            src={`data:image/jpeg;base64, ${picture.image}`}
            placeholder={`data:image/jpeg;base64, ${picture.thumbnail}`}
          >
            {(src) => (
              <img className="image" src={src} alt={picture.filename} />
            )}
          </ProgressiveImage>
        </>
      )}
    </div>
  );
};

export default Image;
