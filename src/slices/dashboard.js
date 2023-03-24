import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import allowanceService from "../services/allowanceService";
import { setMessage } from "./message";

const initialState = { metrics: null };

export const getMetrics = createAsyncThunk(
  "dashboard/getMetrics",
  async (metrics, thunkAPI) => {
    try {
      const data = await allowanceService.getMetrics();
      return { metrics: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  extraReducers: {
    [getMetrics.fulfilled]: (state, action) => {
      state.metrics = action.payload.metrics;
    },
    [getMetrics.rejected]: (state, action) => {
      state.metrics = null;
    },
  },
});

const { reducer } = dashboardSlice;
export default reducer;
