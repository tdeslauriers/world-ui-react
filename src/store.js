import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/auth";
import messageRducer from "./slices/message";

const reducer = {
  auth: authReducer,
  message: messageRducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
