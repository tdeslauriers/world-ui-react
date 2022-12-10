import { createAsyncThunk, createSlice, isFulfilled } from "@reduxjs/toolkit";
import tasktypeService from "../services/tasktypeService";
import { setMessage } from "./message";

export const getTasktypesAll = createAsyncThunk(
  "tasktypes/getTasktypesAll",
  async (all, thunkApi) => {
    try {
      const data = await tasktypeService.getAllTasktypes();
      return { tasktypes: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

export const updateTasktype = createAsyncThunk(
  "tasktypes/update",
  async (tasktype, thunkAPI) => {
    try {
      const response = await tasktypeService.updateTasktype(tasktype);
      return tasktype; // return 204 no content
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const saveTasktype = createAsyncThunk(
  "tasktypes/save",
  async (tasktype, thunkAPI) => {
    try {
      const response = await tasktypeService.saveRole(tasktype);
      return response; // response will include role id, needs to be added
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = [];

const tasktypeSlice = createSlice({
  name: "tasktypes",
  initialState,
  extraReducers: {
    [getTasktypesAll.fulfilled]: (state, action) => {
      return [...action.payload.tasktypes];
    },
    [getTasktypesAll.rejected]: (state, action) => {
      state.tasktypes = null;
    },
    [updateTasktype.fulfilled]: (state, action) => {
      const index = state.findIndex((tt) => tt.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [saveTasktype.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
  },
});

const { reducer } = tasktypeSlice;
export default reducer;