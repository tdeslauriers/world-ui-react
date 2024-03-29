import React, { useEffect, useState } from "react";
import "./Image.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getImage,
  removeAlbumImageXref,
  updateImage,
} from "../../slices/images";
import {
  addToUnpublished,
  removeFromUnpublished,
} from "../../slices/unpublished";
import ProgressiveImage from "react-progressive-graceful-image";
import {
  addToLocalAlbums,
  removeFromSpecificLocalAlbums,
  removeFromAllLocalAlbums,
} from "../../slices/albums";
import Loading from "../../common/Loading";
import ImageAlbums from "./ImageAlbums";
import useSelect from "../../common/useSelect";

const ImageEdit = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const [currentAlbums, setCurrentAlbums] = useState([]);
  const [removeAlbums, setRemoveAlbums] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { filename } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { images: reduxImages } = useSelector((state) => state);
  const { albums: reduxAlbums } = useSelector((state) => state);
  const { message: imageMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filename) {
      const exists = reduxImages.find((p) => p.filename === filename);
      if (exists) {
        setImage(exists);
        if (exists.albums && exists.albums.length) {
          let albs = [];
          exists.albums.forEach((album) => {
            albs.push(album);
          });
          setCurrentAlbums(albs);
        }
        setLoading(false);
      } else {
        setLoading(true);
        dispatch(getImage(filename));
      }
    }
  }, [dispatch, filename, reduxImages, imageMessage]);

  const handleImageChange = (event) => {
    event.preventDefault();
    switch (event.target.name) {
      case "published":
        setImage((previousImage) => ({
          ...previousImage,
          [event.target.name]: !previousImage.published,
        }));
        break;
      default:
        setImage((previousImage) => ({
          ...previousImage,
          [event.target.name]: event.target.value,
        }));
        break;
    }
  };

  const handleAlbumSelect = (event) => {
    event.preventDefault();

    let selected = reduxAlbums.find((a) => a.album === event.target.value);
    // album selection objects could have thumbnails, need to be removed.
    selected = {
      id: selected.id,
      album: selected.album,
      description: selected.description,
    };
    if (!currentAlbums.find((a) => a.album === selected.album)) {
      let updated = [...currentAlbums];
      updated.push(selected);
      setCurrentAlbums(updated);
    }
  };
  const AlbumSelector = useSelect("album", null, handleAlbumSelect);

  const handleRemoveAlbum = (event) => {
    event.preventDefault();

    if (currentAlbums.length > 1) {
      let updated = currentAlbums.filter(
        (a) => a.id !== parseInt(event.target.id)
      );
      setCurrentAlbums(updated);
      let toRemove = removeAlbums;
      toRemove.push({
        album_id: parseInt(event.target.id),
        image_id: image.id,
      });
    }
  };

  const handleSave = (event) => {
    event.preventDefault();
    let updated = {
      id: image.id,
      filename: image.filename,
      title: image.title,
      description: image.description,
      published: image.published,
      albums: currentAlbums,
    };
    dispatch(updateImage(updated))
      .unwrap()
      .then(() => {
        removeAlbums.forEach((ai) => {
          dispatch(removeAlbumImageXref(ai));
        });
      })
      .then(() => {
        if (updated.published) {
          dispatch(removeFromUnpublished(updated));
          dispatch(addToLocalAlbums(updated));
          dispatch(removeFromSpecificLocalAlbums(removeAlbums));
        } else {
          dispatch(addToUnpublished(updated));
          dispatch(removeFromAllLocalAlbums(updated));
        }

        location.state?.from
          ? navigate(location.state.from, {
              state: {
                album: location.state.album,
                albumIndex: location.state.albumIndex,
              },
            })
          : navigate(`/images/${filename}`, {
              state: {
                album: location.state.album,
                albumIndex: location.state.albumIndex,
              },
            });
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    location.state?.from
      ? navigate(location.state.from, {
          state: {
            album: location.state.album,
            albumIndex: location.state.albumIndex,
          },
        })
      : navigate(`/images/${image.filename}`, {
          state: {
            album: location.state.album,
            albumIndex: location.state.albumIndex,
          },
        });
  };

  if (!isLoggedIn) {
    navigate("/login", { state: { from: location } });
  }

  if (imageMessage) {
    navigate("/error", {
      state: { from: location, errorMessage: imageMessage },
    });
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {image && (
        <div>
          <form>
            <div className="top-column">
              <div className="child-column">
                <h3>
                  Edit image: <strong>{image.filename}</strong>
                </h3>
                <h3>
                  {image.published ? null : (
                    <strong className="alert">Un-Published</strong>
                  )}
                </h3>
              </div>
              <div className="child-column">
                <div className="btngroup">
                  <button className="img-button" onClick={handleSave}>
                    Save
                  </button>
                  <button
                    className="btn-cancel img-button"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>

            <hr />

            <div className="img-form">
              <div className="top-column">
                <div className="child-column">
                  <div className="top-column">
                    <div className="child-column">
                      <h4>
                        Picture taken:{" "}
                        <strong>{`${new Date(image.date).toLocaleDateString(
                          "en-US",
                          { timeZone: "UTC" }
                        )}`}</strong>
                      </h4>
                    </div>
                    <div className="child-column">
                      <input
                        className={
                          image.published
                            ? "img-button btn-alert"
                            : "img-button button"
                        }
                        name="published"
                        type="button"
                        style={{ float: "right" }}
                        value={image.published ? "Un-publish" : "Publish"}
                        onClick={handleImageChange}
                      />
                    </div>
                  </div>

                  <input
                    className="form-control"
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={image.title}
                    onChange={handleImageChange}
                  />
                  <textarea
                    className="form-control"
                    name="description"
                    type="text"
                    rows={4}
                    placeholder="Description"
                    value={image.description}
                    onChange={handleImageChange}
                  />

                  <hr />

                  <h3>Appears in: </h3>

                  <AlbumSelector>
                    {reduxAlbums.map((a) => (
                      <option key={a.id} value={a.album}>
                        {a.album}
                      </option>
                    ))}
                  </AlbumSelector>
                  <ImageAlbums
                    albums={currentAlbums}
                    removeAlbum={handleRemoveAlbum}
                  />
                  <em
                    style={{
                      color: "var(--text)",
                      fontSize: "calc(10px + 1vmin)",
                      paddingLeft: ".5em",
                    }}
                  >
                    *Must be present in at least one album.
                  </em>
                </div>
                <div className="child-column">
                  <div className="pic-box">
                    <div>Presentation Image:</div>
                    {image && image.thumbnail && (
                      <ProgressiveImage
                        src={`data:image/jpeg;base64, ${image.presentation}`}
                        placeholder={`data:image/jpeg;base64, ${image.thumbnail}`}
                      >
                        {(src) => (
                          <img
                            className="image img-edit"
                            src={src}
                            alt={"full-resolution-" + image.filename}
                          />
                        )}
                      </ProgressiveImage>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ImageEdit;
