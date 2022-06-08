import axios from "axios";
import authHeader from "./authHeader";

const apiURL =
  process.env.REACT_APP_API_BASE_URL +
  process.env.REACT_APP_API_AUTH +
  "/roles";

const getAllRoles = () => {
  return axios.get(apiURL, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const getRoleById = (id) => {
  return axios
    .get(apiURL + `/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateRole = (role) => {
  return axios.put(apiURL, role, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const saveRole = (role) => {
  return axios
    .post(apiURL, role, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const roleService = {
  getAllRoles,
  getRoleById,
  updateRole,
  saveRole,
};

export default roleService;
