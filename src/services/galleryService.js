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

const galleryService = {
  getAlbums,
  getAlbum,
};

export default galleryService;
