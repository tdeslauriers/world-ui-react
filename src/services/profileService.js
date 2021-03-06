import axios from "axios";
import authHeader from "./authHeader";

const apiURL =
  process.env.REACT_APP_API_BASE_URL +
  process.env.REACT_APP_API_AUTH +
  "/profiles";

const getProfile = () => {
  return axios
    .get(apiURL + "/user", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateProfile = (userdata) => {
  return axios
    .put(apiURL + "/user", userdata, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getProfilesAll = () => {
  return axios
    .get(apiURL + "/all", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getUserById = (id) => {
  return axios
    .get(apiURL + `/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateUser = (userdata) => {
  return axios
    .put(apiURL + "/edit", userdata, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const profileService = {
  getProfile,
  updateProfile,
  getProfilesAll,
  getUserById,
  updateUser,
};

export default profileService;
