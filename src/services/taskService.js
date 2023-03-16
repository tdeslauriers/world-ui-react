import api from "./api";

const apiURL = process.env.REACT_APP_API_ALLOWANCE + "/tasks";

const getDailyTasks = () => {
  return api.get(apiURL + "/daily").then((response) => {
    return response.data;
  });
};

const getInspectionTasks = () => {
  return api.get(apiURL + "/inspect").then((response) => {
    return response.data;
  });
};

const updateTaskComplete = (cmd) => {
  return api.put(apiURL + "/complete", cmd).then((response) => {
    return response.data;
  });
};

const updateTaskQuality = (cmd) => {
  return api.put(apiURL + "/quality", cmd).then((response) => {
    return response.data;
  });
};

const taskService = {
  getDailyTasks,
  getInspectionTasks,
  updateTaskComplete,
  updateTaskQuality,
};

export default taskService;
