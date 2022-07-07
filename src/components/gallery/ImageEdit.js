import React, { useEffect, useState } from "react";
import "./Image.css";
import { useDispatch, useSelector } from "react-redux";
import {
  Navigate,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getImage } from "../../slices/images";
import ProgressiveImage from "react-progressive-graceful-image";
import { type } from "@testing-library/user-event/dist/type";

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
      } else {
        dispatch(getImage(filename));
      }
    }
  }, [dispatch, filename, reduxImages, imageMessage]);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
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
                  <button className="img-button">Save</button>
                  <button className="btn-cancel img-button">Cancel</button>
                </div>
              </div>
            </div>

            <hr />

            <div className="img-form">
              <div className="top-column">
                <div className="child-column">
                  <h4>
                    Picture taken:{" "}
                    <strong>{`${new Date(
                      image.date
                    ).toLocaleDateString()}`}</strong>
                  </h4>
                  <input
                    className="form-control"
                    name="title"
                    type="text"
                    placeholder="Title"
                    value={image.title}
                  />
                  <textarea
                    className="form-control"
                    title="description"
                    type="text"
                    placeholder="Description"
                    value={image.description}
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
