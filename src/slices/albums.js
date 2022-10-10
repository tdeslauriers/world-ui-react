import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/galleryService";
import { clearMessage, setMessage } from "./message";

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

const initialState = [];

const albumsSlice = createSlice({
  name: "albums",
  initialState,
  reducers: {
    addToLocalAlbums: (state, action) => {
      if (state.length) {
        action.payload.albumImages.forEach((ai) => {
          const index = state.findIndex((a) => a.album === ai.album.album);
          if (index > -1) {
            const thumbnail = {
              id: action.payload.id,
              filename: action.payload.filename,
              title: action.payload.title,
              description: action.payload.description,
              date: action.payload.date,
              published: action.payload.unpublished,
              thumbnail: action.payload.thumbnail,
            };
            const thumbIndex = state[index].thumbnails.findIndex(
              (t) => t.id === thumbnail.id
            );
            if (thumbIndex > -1) {
              state[index].thumbnails[thumbIndex] = thumbnail;
            } else {
              state[index].thumbnails.push(thumbnail);
            }
          }
        });
      }
    },
    removeFromLocalAlbums: (state, action) => {
      if (state.length) {
        action.payload.albumImages.forEach((ai) => {
          const index = state.findIndex((a) => a.album === ai.album.album);
          if (index > -1) {
            const thumbs = state[index].thumbnails.filter(
              (t) => t.id !== action.payload.id
            );
            state[index].thumbnails = thumbs;
          }
        });
      }
    },
  },
  extraReducers: {
    [getAlbum.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = albumsSlice;

export const { addToLocalAlbums, removeFromLocalAlbums } = actions;
export default reducer;
