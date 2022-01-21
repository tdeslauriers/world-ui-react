import {
  REGISTRATION_SUCCESSFUL,
  REGISTRATION_FAILURE,
  LOGIN_SUCCESSFUL,
  LOGIN_FAILURE,
  LOGOUT,
} from "../actions/types";

const user = JSON.parse(localStorage.getItem("user"));

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case REGISTRATION_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: false,
      };
    case REGISTRATION_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
      };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
}
