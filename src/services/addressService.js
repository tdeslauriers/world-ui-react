import api from "./api";

const apiURL = process.env.REACT_APP_API_AUTH + "/addresses";

const deleteAddress = (id) => {
  return api.delete(apiURL + `/${id}`).then((response) => {
    return response.data;
  });
};

const deleteUserAddress = (id) => {
  return api.delete(apiURL + `/delete/${id}`).then((response) => {
    return response.data;
  });
};

const addressService = {
  deleteAddress,
  deleteUserAddress,
};

export default addressService;
