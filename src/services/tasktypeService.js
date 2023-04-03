import api from "./api";

const apiURL = process.env.REACT_APP_API_ALLOWANCE + "/tasktypes";

const getAllTasktypes = () => {
  return api.get(apiURL).then((response) => {
    return response.data;
  });
};

const getTasktypeById = (id) => {
  return api.get(apiURL + `/${id}`).then((response) => {
    return response.data;
  });
};

const updateTasktype = (tasktype) => {
  return api.put(apiURL, tasktype).then((response) => {
    return response.data;
  });
};

const saveTasktype = (tasktype) => {
  return api.post(apiURL, tasktype).then((response) => {
    return response.data;
  });
};

const removeTasktypeAllowance = (cmd) => {
  api.put(apiURL + "/remove/tasktype/allowance", cmd).then((response) => {
    return response;
  });
};

const tasktypeService = {
  getAllTasktypes,
  getTasktypeById,
  updateTasktype,
  saveTasktype,
  removeTasktypeAllowance,
};

export default tasktypeService;
