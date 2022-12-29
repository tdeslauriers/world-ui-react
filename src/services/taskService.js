import axios from "axios";
import authHeader from "./authHeader";

const apiURL =
  process.env.REACT_APP_API_BASE_URL +
  process.env.REACT_APP_API_ALLOWANCE +
  "/tasks";

const getDailyTasks = () => {
  return axios
    .get(apiURL + "/daily", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateTaskComplete = (cmd) => {
  return axios
    .put(apiURL + "/complete", cmd, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const updateTaskQuality = (cmd) => {
  return axios
    .put(apiURL + "/quality", cmd, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const taskService = {
  getDailyTasks,
  updateTaskComplete,
  updateTaskQuality,
};

export default taskService;
