import axios from "axios";

const AUTH_API_URL = "http://localhost/api/auth"; // dev only

const login = (username, password) => {
  return axios
    .post(AUTH_API_URL + "/login", { username, password })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem("user");
};

const register = (username, password, confirmPassword, firstname, lastname) => {
  return axios.post(AUTH_API_URL + "/register", {
    username,
    password,
    confirmPassword,
    firstname,
    lastname,
  });
};

const authService = {
  login,
  logout,
  register,
};

export default authService;
