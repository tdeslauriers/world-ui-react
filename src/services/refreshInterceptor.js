import { logout, refreshToken } from "../slices/auth";
import axiosInstance from "./api";
import tokenService from "./tokenService";

const authURL = process.env.REACT_APP_API_AUTH;

const refresh = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = tokenService.getAccessToken();
      if (token) {
        config.headers["Authorization"] = "Bearer " + token;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const { dispatch } = store;
  axiosInstance.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;
      // check not error from login service endpoint
      if (originalConfig.url !== `${authURL}/login` && err.response) {
        //check if access token expired
        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true;
          try {
            const cmd = {
              grant_type: "refresh_token",
              refresh_token: tokenService.getRefreshToken(),
            };
            console.log(cmd.refresh_token);
            const rs = await axiosInstance.post(`${authURL}/refresh`, cmd);

            const { access_token } = rs.data;

            dispatch(refreshToken(access_token));
            tokenService.updateAccessToken(access_token);

            return axiosInstance(originalConfig);
          } catch (_error) {
            dispatch(logout());
            return Promise.reject(_error);
          }
        }
      }
      return Promise.reject(err);
    }
  );
};

export default refresh;
