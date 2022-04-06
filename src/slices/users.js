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

export const updateUser = createAsyncThunk(
  "users/update",
  async (userdata, thunkAPI) => {
    try {
      const res = await profileService.updateUser(userdata);
      return res; // need to return the user data for the slice
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
    [updateUser.fulfilled]: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      // removing spreader to account for deleted property: []
      state[index] = action.payload;
    },
  },
});

const { reducer } = usersSlice;
export default reducer;
