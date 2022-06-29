import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/galleryService";
import { setMessage } from "./message";

export const getAlbums = createAsyncThunk(
  "albums/getAlbums",
  async (all, thunkAPI) => {
    try {
      const data = await galleryService.getAlbums();
      return { albums: data };
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
    [getAlbums.fulfilled]: (state, action) => {
      return [...action.payload.albums];
    },
    [getAlbums.rejected]: (state, action) => {
      state.albums = null;
    },
  },
});

const { reducer } = albumsSlice;
export default reducer;
