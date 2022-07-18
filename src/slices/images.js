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

export const updateImage = createAsyncThunk(
  "images/updateImage",
  async (image, thunkApi) => {
    try {
      const response = await galleryService.updateImage(image);
      return image;
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

const initialState = [];

const imageSlice = createSlice({
  name: "images",
  initialState,
  extraReducers: {
    [getImage.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [updateImage.fulfilled]: (state, action) => {
      const index = state.findIndex((image) => image.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
  },
});

const { reducer } = imageSlice;
export default reducer;
