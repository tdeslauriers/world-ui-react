import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profileService";
import { setMessage } from "./message";

export const getProfilesAll = createAsyncThunk(
  "profiles/getProfilesAll",
  async (all, thunkAPI) => {
    try {
      const data = await profileService.getProfilesAll();
      return { profiles: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = [];

const profilesAllSlice = createSlice({
  name: "profiles",
  initialState,
  extraReducers: {
    [getProfilesAll.fulfilled]: (state, action) => {
      return [...action.payload.profiles];
    },
    [getProfilesAll.rejected]: (state, action) => {
      state.profiles = null;
    },
  },
});

const { reducer } = profilesAllSlice;
export default reducer;