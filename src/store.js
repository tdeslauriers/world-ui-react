import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import messageRducer from "./slices/message";
import profileReducer from "./slices/profile";

const reducer = {
  auth: authReducer,
  profile: profileReducer,
  message: messageRducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
