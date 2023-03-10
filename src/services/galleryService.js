import api from "./api";

const apiURL = process.env.REACT_APP_API_GALLERY;

const getAlbums = () => {
  return api.get(apiURL + "/albums").then((response) => {
    return response.data;
  });
};

const getAlbum = (album) => {
  return api.get(apiURL + `/albums/${album}`).then((response) => {
    return response.data;
  });
};

const getUnpublished = () => {
  return api.get(apiURL + "/images/unpublished").then((response) => {
    return response.data;
  });
};

const getImage = (filename) => {
  return api.get(apiURL + `/images/${filename}`).then((response) => {
    return response.data;
  });
};

const getFullResolution = (filename) => {
  return api
    .get(apiURL + `/images/fullresolution/${filename}`)
    .then((response) => {
      return response.data;
    });
};

const updateImage = (image) => {
  return api.put(apiURL + "/images", image).then((response) => {
    return response.data;
  });
};

const deleteImage = (filename) => {
  return api.delete(apiURL + `/images/${filename}`);
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
