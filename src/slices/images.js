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

export const getFullResolution = createAsyncThunk(
  "images/getFullResolution",
  async (filename, thunkApi) => {
    try {
      const data = await galleryService.getFullResolution(filename);
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
      return response;
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

export const deleteImage = createAsyncThunk(
  "images/deleteImage",
  async (filename, thunkApi) => {
    try {
      const response = await galleryService.deleteImage(filename);
      return filename;
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
    [getFullResolution.fulfilled]: (state, action) => {
      const index = state.findIndex(
        (image) => image.filename === action.payload.filename
      );
      state[index] = { ...state[index], image: action.payload.image };
      console.log(state[index]);
    },
    [updateImage.fulfilled]: (state, action) => {
      const index = state.findIndex((image) => image.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [deleteImage.fulfilled]: (state, action) => {
      // action.payload is filename returned artificially by thunk
      return state.filter((image) => image.filename !== action.payload);
    },
  },
});

const { reducer } = imageSlice;
export default reducer;
