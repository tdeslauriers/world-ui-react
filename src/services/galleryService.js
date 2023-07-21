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

const updateAlbum = (album) => {
  return api.put(apiURL + "/albums", album).then((response) => {
    return response.data;
  });
};

const saveAlbum = (album) => {
  return api.post(apiURL + "/albums", album).then((response) => {
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

// put so response body can be utilized.
const deleteAlbumImageXref = (xref) => {
  return api
    .put(apiURL + "/images/album_images/delete", xref)
    .then((response) => {
      return response.data;
    });
};

const galleryService = {
  getAlbums,
  getAlbum,
  updateAlbum,
  saveAlbum,
  getUnpublished,
  getImage,
  getFullResolution,
  updateImage,
  deleteImage,
  deleteAlbumImageXref,
};

export default galleryService;
