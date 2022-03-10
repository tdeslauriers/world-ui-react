import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import profileReducer from "./slices/profile";
import usersReducer from "./slices/users";

const reducer = {
  auth: authReducer,
  profile: profileReducer,
  users: usersReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
