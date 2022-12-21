import axios from "axios";
import authHeader from "./authHeader";

const apiURL =
  process.env.REACT_APP_API_BASE_URL +
  process.env.REACT_APP_API_ALLOWANCE +
  "/allowances";

const getAllowances = () => {
  return axios.get(apiURL, { headers: authHeader() }).then((response) => {
    return response.data;
  });
};

const allowanceService = {
  getAllowances,
};

export default allowanceService;
