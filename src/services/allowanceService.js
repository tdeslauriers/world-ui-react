import api from "./api";

const apiURL = process.env.REACT_APP_API_ALLOWANCE + "/allowances";

const getAllowances = () => {
  return api.get(apiURL).then((response) => {
    return response.data;
  });
};

const allowanceService = {
  getAllowances,
};

export default allowanceService;
