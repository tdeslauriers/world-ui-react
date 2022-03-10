import axios from "axios";
import authHeader from "./authHeader";

const PROFILE_API_URL = "https://localhost:8443/profiles";

const getProfile = () => {
  return axios
    .get(PROFILE_API_URL + "/user", { headers: authHeader() })
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

const profileService = {
  getProfile,
  getProfilesAll,
  getUserById,
};

export default profileService;
