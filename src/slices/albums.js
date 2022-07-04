import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/galleryService";
import { setMessage } from "./message";

export const getAlbum = createAsyncThunk(
  "album/getAlbum",
  async (album, thunkAPI) => {
    try {
      const data = await galleryService.getAlbum(album);
      return data;
    } catch (error) {}
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
  },
});

const { reducer } = albumsSlice;
export default reducer;
