import api from "./api";

const apiURL = process.env.REACT_APP_API_AUTH + "/profiles";

const getProfile = () => {
  return api.get(apiURL + "/user").then((response) => {
    return response.data;
  });
};

const updateProfile = (userdata) => {
  return api.put(apiURL + "/user", userdata).then((response) => {
    return response.data;
  });
};

const getProfilesAll = () => {
  return api.get(apiURL).then((response) => {
    return response.data;
  });
};

const getUserByUuid = (uuid) => {
  return api.get(apiURL + `/${uuid}`).then((response) => {
    return response.data;
  });
};

const updateUser = (userdata) => {
  return api.put(apiURL + "/edit", userdata).then((response) => {
    return response.data;
  });
};

const resetPassword = (cmd) => {
  return api.post(apiURL + "/reset", cmd).then((response) => {
    return response;
  });
};

const removeUserrole = (cmd) => {
  return api.put(apiURL + "/remove/userrole", cmd).then((response) => {
    return response;
  });
};

const profileService = {
  getProfile,
  updateProfile,
  getProfilesAll,
  getUserByUuid,
  updateUser,
  resetPassword,
  removeUserrole,
};

export default profileService;
