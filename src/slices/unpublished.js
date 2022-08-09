import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import galleryService from "../services/galleryService";
import { setMessage } from "./message";

export const getUnpublished = createAsyncThunk(
  "unpublished/getUnpublished",
  async (unpublished, thunkAPI) => {
    try {
      const data = await galleryService.getUnpublished();
      return data;
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = { unpublished: false };

const unpublishedSlice = createSlice({
  name: "unpublished",
  initialState,
  reducers: {
    addToUnpublished: (state, action) => {
      const image = {
        id: action.payload.id,
        filename: action.payload.filename,
        date: action.payload.date,
        published: action.payload.unpublished,
        thumbnail: action.payload.thumbnail,
      };

      if (!state.unpublishedImages) {
        state.unpublishedImages = [...image];
      }
      if (state.unpublishedImages && state.unpublishedImages.length) {
        const index = state.unpublishedImages.findIndex(
          (i) => i.id === image.id
        );
        console.log(index);
        if (index > -1) {
          state.unpublishedImages[index] = {
            ...state.unpublishedImages[index],
            ...image,
          };
        } else {
          state.unpublishedImages.push(image);
        }
      }
      if (state.unpublishedImages && !state.unpublishedImages.length) {
        state.unpublishedImages.push(image);
      }

      state.unpublished = true;
    },
    removeFromUnpublished: (state, action) => {
      if (state.unpublishedImages && state.unpublishedImages.length) {
        state.unpublishedImages = state.unpublishedImages.filter(
          (up) => up.id !== action.payload.id
        );
      }
      state.unpublishedImages && state.unpublishedImages.length
        ? (state.unpublished = true)
        : (state.unpublished = false);
    },
  },
  extraReducers: {
    [getUnpublished.fulfilled]: (state, action) => {
      const images = [...action.payload];
      if (images.length !== 0) {
        state.unpublished = true;
        state.unpublishedImages = images;
      } else {
        state.unpublished = false;
        state.unpublishedImages = [];
      }
    },
  },
});

const { reducer, actions } = unpublishedSlice;

export const { addToUnpublished, removeFromUnpublished } = actions;
export default reducer;
