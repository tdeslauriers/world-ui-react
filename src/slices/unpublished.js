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
  extraReducers: {
    [getUnpublished.fulfilled]: (state, action) => {
      const images = [...action.payload];
      if (images.length !== 0) {
        state.unpublished = {
          unpublished: true,
          unpublishedImages: action.payload,
        };
      } else {
        state.unpublished = {
          unpublished: false,
          unpublishedImages: [],
        };
      }
    },
  },
});

const { reducer } = unpublishedSlice;
export default reducer;
