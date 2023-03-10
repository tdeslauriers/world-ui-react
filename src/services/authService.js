import api from "./api";
import tokenService from "./tokenService";
const apiURL = process.env.REACT_APP_API_AUTH;

const login = (username, password) => {
  return api
    .post(apiURL + "/login", { username, password })
    .then((response) => {
      if (response.data.access_token) {
        tokenService.setUser(response.data);
      }
      return response.data;
    });
};

const logout = () => {
  tokenService.removeUser();
};

const register = (username, password, confirmPassword, firstname, lastname) => {
  return api.post(apiURL + "/register", {
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
