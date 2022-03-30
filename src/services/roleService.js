import axios from "axios";
import authHeader from "./authHeader";

const ROLES_API_URL = "https://localhost:8443/roles";

const getAllRoles = () => {
  return axios
    .get(ROLES_API_URL, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const getRoleById = (id) => {
  return axios
    .get(ROLES_API_URL + `/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateRole = (role) => {
  return axios
    .put(ROLES_API_URL, role, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const saveRole = (role) => {
  return axios
    .post(ROLES_API_URL, role, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};
