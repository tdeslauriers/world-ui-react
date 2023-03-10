import api from "./api";

const apiURL = process.env.REACT_APP_API_AUTH + "/roles";

const getAllRoles = () => {
  return api.get(apiURL).then((response) => {
    return response.data;
  });
};

const getRoleById = (id) => {
  return api.get(apiURL + `/${id}`).then((response) => {
    return response.data;
  });
};

const updateRole = (role) => {
  return api.put(apiURL, role).then((response) => {
    return response.data;
  });
};

const saveRole = (role) => {
  return api.post(apiURL, role).then((response) => {
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
