import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import albumsReducer from "./slices/albums";
import imageReducer from "./slices/images";
import unpublishedReducer from "./slices/unpublished";
import messageReducer from "./slices/message";
import profileReducer from "./slices/profile";
import usersReducer from "./slices/users";
import rolesReducer from "./slices/roles";
import tasktypesReducer from "./slices/tasktypes";
import allowancesReducer from "./slices/allowances";

const reducer = {
  auth: authReducer,
  albums: albumsReducer,
  images: imageReducer,
  unpublished: unpublishedReducer,
  profile: profileReducer,
  users: usersReducer,
  roles: rolesReducer,
  message: messageReducer,
  tasktypes: tasktypesReducer,
  allowances: allowancesReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
