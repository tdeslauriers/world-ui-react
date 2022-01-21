import axios from "axios";
import authHeader from "./authHeader";

const PROFILE_API_URL = "https://localhost:8443/profile";

export const profileService = {
  getprofile() {
    return axios.get(PROFILE_API_URL, { headers: authHeader });
  },
};
