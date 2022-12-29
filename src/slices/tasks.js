import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "../services/taskService";
import { setMessage } from "./message";

export const getDailyTasks = createAsyncThunk(
  "tasks/getDailyTasks",
  async (daily, thunkApi) => {
    try {
      const data = await taskService.getDailyTasks();
      return { tasks: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

export const updateTaskComplete = createAsyncThunk(
  "tasks/updateTaskComplete",
  async (cmd, thunkApi) => {
    try {
      const res = await taskService.updateTaskComplete(cmd);
      return cmd;
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

export const updateTaskQuality = createAsyncThunk(
  "tasks/updateTaskQuality",
  async (cmd, thunkApi) => {
    try {
      const res = await taskService.updateTaskQuality(cmd);
      return cmd;
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

const initialState = [];

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  extraReducers: {
    [getDailyTasks.fulfilled]: (state, action) => {
      return [...action.payload.tasks];
    },
    [getDailyTasks.rejected]: (state, action) => {
      state.tasks = null;
    },
    [updateTaskComplete.fulfilled]: (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.taskId);
      state[index] = { ...state[index], isComplete: action.payload.status };
    },
    [updateTaskQuality.fulfilled]: (state, action) => {
      const index = state.findIndex((t) => t.id === action.payload.taskId);
      state[index] = { ...state[index], isQuality: action.payload.status };
    },
  },
});

const { reducer } = tasksSlice;
export default reducer;
