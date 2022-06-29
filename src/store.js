import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import albumsReducer from "./slices/albums";
import messageReducer from "./slices/message";
import profileReducer from "./slices/profile";
import usersReducer from "./slices/users";
import rolesReducer from "./slices/roles";

const reducer = {
  auth: authReducer,
  albums: albumsReducer,
  profile: profileReducer,
  users: usersReducer,
  roles: rolesReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
