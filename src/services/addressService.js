import axios from "axios";
import authHeader from "./authHeader";

const apiURL =
  process.env.REACT_APP_API_BASE_URL +
  process.env.REACT_APP_API_AUTH +
  "/addresses";

const deleteAddress = (id) => {
  return axios
    .delete(apiURL + `/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const deleteUserAddress = (id) => {
  return axios
    .delete(apiURL + `/delete/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const addressService = {
  deleteAddress,
  deleteUserAddress,
};

export default addressService;
