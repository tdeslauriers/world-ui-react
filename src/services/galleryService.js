import axios from "axios";
import authHeader from "./authHeader";

const apiURL =
  process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_GALLERY;

const getAlbums = () => {
  return axios
    .get(apiURL + "/albums", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getAlbum = (album) => {
  return axios
    .get(apiURL + `/albums/${album}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getUnpublished = () => {
  return axios
    .get(apiURL + "/images/unpublished", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getImage = (filename) => {
  return axios
    .get(apiURL + `/images/${filename}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const getFullResolution = (filename) => {
  return axios
    .get(apiURL + `/images/fullresolution/${filename}`, {
      headers: authHeader(),
    })
    .then((response) => {
      return response.data;
    });
};

const updateImage = (image) => {
  return axios
    .put(apiURL + "/images", image, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const deleteImage = (filename) => {
  return axios.delete(apiURL + `/images/${filename}`, {
    headers: authHeader(),
  });
};

const galleryService = {
  getAlbums,
  getAlbum,
  getUnpublished,
  getImage,
  getFullResolution,
  updateImage,
  deleteImage,
};

export default galleryService;
