import axios from "axios";
import authHeader from "./authHeader";

const apiURL =
  process.env.REACT_APP_API_BASE_URL +
  process.env.REACT_APP_API_ALLOWANCE +
  "/tasktypes";

const getAllTasktypes = () => {
  return axios.get(apiURL, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const getTasktypeById = (id) => {
  return axios
    .get(apiURL + `/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateTasktype = (tasktype) => {
  return axios
    .put(apiURL, tasktype, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const archiveTasktype = (id) => {
  return axios
    .put(apiURL + "/archive", { archiveId: id }, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const saveTasktype = (tasktype) => {
  return axios
    .post(apiURL, tasktype, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const tasktypeService = {
  getAllTasktypes,
  getTasktypeById,
  updateTasktype,
  archiveTasktype,
  saveTasktype,
};

export default tasktypeService;
