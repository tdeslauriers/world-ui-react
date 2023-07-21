import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/galleryService";
import { clearMessage, setMessage } from "./message";

export const getAlbums = createAsyncThunk(
  "albums/getAlbums",
  async (albums, thunkAPI) => {
    try {
      const data = await galleryService.getAlbums();
      return data;
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getAlbum = createAsyncThunk(
  "albums/getAlbum",
  async (album, thunkAPI) => {
    try {
      const data = await galleryService.getAlbum(album);
      return { album: album, thumbnails: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateAlbum = createAsyncThunk(
  "albums/updateAlbum",
  async (album, thunkAPI) => {
    try {
      const response = await galleryService.updateAlbum(album);
      return album;
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const saveAlbum = createAsyncThunk(
  "albums/saveAlbum",
  async (album, thunkAPI) => {
    try {
      const response = await galleryService.saveAlbum(album);
      return response;
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
        action.payload.albums.forEach((album) => {
          const index = state.findIndex((a) => a.album === album.album);
          if (index > -1 && state[index].thumbnails) {
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
    removeFromSpecificLocalAlbums: (state, action) => {
      if (state.length) {
        let albumImages = action.payload;
        albumImages.forEach((ai) => {
          const index = state.findIndex((a) => a.id === ai.album_id);
          if (index > -1 && state[index].thumbnails) {
            const thumbs = state[index].thumbnails.filter(
              (t) => t.id !== ai.image_id
            );
            state[index].thumbnails = thumbs;
          }
        });
      }
    },
    removeFromAllLocalAlbums: (state, action) => {
      if (state.length) {
        action.payload.albums.forEach((album) => {
          const index = state.findIndex((a) => a.album === album.album);
          if (index > -1 && state[index].thumbnails) {
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
    [getAlbums.fulfilled]: (state, action) => {
      return [...action.payload];
    },
    [getAlbum.fulfilled]: (state, action) => {
      let index = state.findIndex((a) => a.album === action.payload.album);
      if (index > -1) {
        state[index].thumbnails = action.payload.thumbnails;
      }
    },
    [updateAlbum.fulfilled]: (state, action) => {
      const index = state.findIndex((album) => album.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [saveAlbum.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer, actions } = albumsSlice;

export const {
  addToLocalAlbums,
  removeFromSpecificLocalAlbums,
  removeFromAllLocalAlbums,
} = actions;
export default reducer;
