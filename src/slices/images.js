import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/galleryService";
import { setMessage } from "./message";

export const getImage = createAsyncThunk(
  "images/getImage",
  async (filename, thunkApi) => {
    try {
      const data = await galleryService.getImage(filename);
      return data;
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

const initialState = [];

const usersSlice = createSlice({
  name: "images",
  initialState,
  extraReducers: {
    [getImage.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer } = usersSlice;
export default reducer;
