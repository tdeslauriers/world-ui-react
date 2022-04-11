import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profileService";
import { setMessage } from "./message";

// user param added in async > method parameter requirement (not used)
export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (user, thunkAPI) => {
    try {
      const data = await profileService.getProfile();
      return { profile: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateProfile = createAsyncThunk(
  "profile/updateProfile",
  async (userdata, thunkAPI) => {
    try {
      const res = await profileService.updateProfile(userdata);
      return res;
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = {};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  extraReducers: {
    [getProfile.fulfilled]: (state, action) => {
      state.profile = action.payload.profile;
    },
    [getProfile.rejected]: (state, action) => {
      state.profile = null;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.profile = action.payload;
    },
  },
});

const { reducer } = profileSlice;
export default reducer;
