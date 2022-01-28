import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profileService";
import { setMessage } from "./message";

export const getprofile = createAsyncThunk(
  "profile/getProfile",
  async (thunkAPI) => {
    try {
      const data = await profileService.getprofile();
      return { profile: data };
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
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
    [getprofile.fulfilled]: (state, action) => {
      state.profile = action.payload.profile;
    },
    [getprofile.rejected]: (state, action) => {
      state.profile = { nope: "no monkey" };
    },
  },
});

const { reducer } = profileSlice;
export default reducer;
