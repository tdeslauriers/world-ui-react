import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import messageReducer from "./slices/message";
import profileReducer from "./slices/profile";
import profilesAllReducer from "./slices/profilesAll";

const reducer = {
  auth: authReducer,
  profile: profileReducer,
  profiles: profilesAllReducer,
  message: messageReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
