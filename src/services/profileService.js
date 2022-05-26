import axios from "axios";
import authHeader from "./authHeader";

const PROFILE_API_URL = "http://localhost:8080/profiles";

const getProfile = () => {
  return axios
    .get(PROFILE_API_URL + "/user", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateProfile = (userdata) => {
  return axios
    .put(PROFILE_API_URL + "/user", userdata, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getProfilesAll = () => {
  return axios
    .get(PROFILE_API_URL + "/all", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getUserById = (id) => {
  return axios
    .get(PROFILE_API_URL + `/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateUser = (userdata) => {
  return axios
    .put(PROFILE_API_URL + "/edit", userdata, { headers: authHeader() })
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
