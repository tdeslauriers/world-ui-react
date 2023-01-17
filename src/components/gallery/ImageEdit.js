import React, { useEffect, useState } from "react";
import "./Image.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  deleteImage,
  getFullResolution,
  getImage,
  updateImage,
} from "../../slices/images";
import {
  addToUnpublished,
  removeFromUnpublished,
} from "../../slices/unpublished";
import { Buffer } from "buffer";
import ProgressiveImage from "react-progressive-graceful-image";
import { addToLocalAlbums, removeFromLocalAlbums } from "../../slices/albums";
import Loading from "../../common/Loading";

const ImageEdit = () => {
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { filename } = useParams();

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { images: reduxImages } = useSelector((state) => state);
  const { message: imageMessage } = useSelector((state) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (filename) {
      const exists = reduxImages.find((p) => p.filename === filename);
      if (exists) {
        setImage(exists);
        setLoading(false);
      } else {
        setLoading(true);
        dispatch(getImage(filename));
      }
    }
  }, [dispatch, filename, reduxImages, imageMessage]);

  //get full res
  useEffect(() => {
    if (image.filename && image.presentation && !image.image) {
      dispatch(getFullResolution(filename));
      const p = reduxImages.find((i) => i.filename === filename);
      setImage(p);
    }
  }, [image]);



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

  const handleSave = (event) => {
    event.preventDefault();

    dispatch(
      updateImage({
        id: image.id,
        title: image.title,
        description: image.description,
        published: image.published,
      })
    )
      .unwrap()
      .then(() => {
        if (image.published) {
          dispatch(removeFromUnpublished(image));
          dispatch(addToLocalAlbums(image));
        } else {
          dispatch(addToUnpublished(image));
          dispatch(removeFromLocalAlbums(image));
        }

        location.state?.from
          ? navigate(location.state.from)
          : navigate(`/images/${filename}`);
      });
  };

  const handleCancel = (event) => {
    event.preventDefault();
    location.state?.from
      ? navigate(location.state.from)
      : navigate(`/images/${image.filename}`);
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
                </div>
                <div className="child-column">
                  <div className="pic-box">
                    <div>Thumbnail:</div>
                    <img
                      id={image.filename}
                      className="thumbnail-pic"
                      alt={"thumbnail-" + image.filename}
                      src={`data:image/jpeg;base64, ${image.thumbnail}`}
                    />
                    <br />
                    <br />
                    <div>Full Resolution:</div>
                    <ProgressiveImage
                      src={`data:image/jpeg;base64, ${image.image}`}
                      placeholder={`data:image/jpeg;base64, ${image.presentation}`}
                    >
                      {(src) => (
                        <img
                          className="image img-edit"
                          src={src}
                          alt={"full-resolution-" + image.filename}
                        />
                      )}
                    </ProgressiveImage>
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
