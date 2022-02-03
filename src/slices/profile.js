import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profileService";
import { setMessage } from "./message";

// "user" added in async
export const getprofile = createAsyncThunk(
  "profile/getProfile",
  async (user, thunkAPI) => {
    try {
      const data = await profileService.getprofile();
      return { profile: data };
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
    [getprofile.fulfilled]: (state, action) => {
      state.profile = action.payload.profile;
    },
    [getprofile.rejected]: (state, action) => {
      state.profile = null;
    },
  },
});

const { reducer } = profileSlice;
export default reducer;
