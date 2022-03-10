import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profileService";
import { setMessage } from "./message";

export const getUsersAll = createAsyncThunk(
  "users/getUsersAll",
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

const usersSlice = createSlice({
  name: "users",
  initialState,
  extraReducers: {
    [getUsersAll.fulfilled]: (state, action) => {
      return [...action.payload.profiles];
    },
    [getUsersAll.rejected]: (state, action) => {
      state.profiles = null;
    },
  },
});

const { reducer } = usersSlice;
export default reducer;
