import axios from "axios";

const apiURL =
  process.env.REACT_APP_API_BASE_URL +
  process.env.REACT_APP_API_ALLOWANCE +
  "/tasks";

  const getDailyTasks = () => {
    return axios.get(apiURL, )
  }