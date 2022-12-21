import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import allowanceService from "../services/allowanceService";
import { setMessage } from "./message";

export const getAllowances = createAsyncThunk(
  "allowances/getAllowances",
  async (all, thunkApi) => {
    try {
      const data = await allowanceService.getAllowances();
      return { allowances: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

const initialState = [];

const allowancesSlice = createSlice({
  name: "allowances",
  initialState,
  extraReducers: {
    [getAllowances.fulfilled]: (state, action) => {
      return [...action.payload.allowances];
    },
    [getAllowances.rejected]: (state, action) => {
      state.allowances = null;
    },
  },
});

const { reducer } = allowancesSlice;
export default reducer;
