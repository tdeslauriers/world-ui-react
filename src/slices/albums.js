import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/galleryService";
import { setMessage } from "./message";

export const getAlbum = createAsyncThunk(
  "albums/getAlbum",
  async (album, thunkAPI) => {
    try {
      const data = await galleryService.getAlbum(album);
      return data;
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getUnpublished = createAsyncThunk(
  "albums/getUnpublished",
  async (unpublished, thunkAPI) => {
    try {
      const data = await galleryService.getUnpublished();
      return { album: "unpublished", thumbnails: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = [];

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  extraReducers: {
    [getAlbum.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [getUnpublished.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer } = albumsSlice;
export default reducer;
