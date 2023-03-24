import api from "./api";

const apiURL = process.env.REACT_APP_API_ALLOWANCE + "/allowances";

const getAllowances = () => {
  return api.get(apiURL).then((response) => {
    return response.data;
  });
};

const getMetrics = () => {
  return api.get(apiURL + "/dashboard").then((response) => {
    return response.data;
  });
};

const allowanceService = {
  getAllowances,
  getMetrics,
};

export default allowanceService;
