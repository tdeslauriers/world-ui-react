import axios from "axios";

const apiURL =
  process.env.REACT_APP_API_BASE_URL + process.env.REACT_APP_API_AUTH;

const login = (username, password) => {
  return axios
    .post(apiURL + "/login", { username, password })
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
  return axios.post(apiURL + "/register", {
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
