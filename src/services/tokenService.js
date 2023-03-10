const getRefreshToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.refresh_token;
};

const getAccessToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user?.access_token;
};

const updateAccessToken = (token) => {
  let user = JSON.parse(localStorage.getItem("user"));
  user.access_token = token;
  localStorage.setItem("user", JSON.stringify(user));
};

const getUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const setUser = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUser = () => {
  localStorage.removeItem("user");
};

const tokenService = {
  getRefreshToken,
  getAccessToken,
  updateAccessToken,
  getUser,
  setUser,
  removeUser,
};

export default tokenService;
