import {
  REGISTRATION_SUCCESSFUL,
  REGISTRATION_FAILURE,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  LOGOUT,
  SET_MESSAGE,
} from "./types";
import authService from "../services/authService";

export const register =
  (username, password, confirmPassword, firstname, lastname) => (dispatch) => {
    return authService
      .register(username, password, confirmPassword, firstname, lastname)
      .then(
        (response) => {
          dispatch({
            type: REGISTRATION_SUCCESSFUL,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: response.data.message,
          });

          return Promise.resolve();
        },
        (error) => {
          const message =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          dispatch({
            type: REGISTRATION_FAILURE,
          });

          dispatch({
            type: SET_MESSAGE,
            payload: message,
          });

          return Promise.reject();
        }
      );
  };

export const login = (username, password) => (dispatch) => {
  return authService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESSFUL,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAILURE,
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  authService.logout();

  dispatch({
    type: LOGOUT,
  });
};
