import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import taskService from "../services/taskService";
import { setMessage } from "./message";

export const getInspectionTasks = createAsyncThunk(
  "taskInspects/getInspectionTasks",
  async (inspect, thunkApi) => {
    try {
      const data = await taskService.getInspectionTasks();
      return { taskInspects: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkApi.dispatch(setMessage(message));
      return thunkApi.rejectWithValue();
    }
  }
);

const initialState = [];

const taskInspectsSlice = createSlice({
  name: "taskInspects",
  initialState,
  reducers: {
    updateCompleteStatus: (state, action) => {
      state.forEach((i) => {
        if (i.tasks) {
          const index = i.tasks.findIndex(
            (t) => t.id === action.payload.taskId
          );
          i.tasks[index] = {
            ...i.tasks[index],
            complete: action.payload.status,
          };
        }
      });
    },
    updateSatisfactoryStatus: (state, action) => {
      state.forEach((i) => {
        if (i.tasks) {
          const index = i.tasks.findIndex(
            (t) => t.id === action.payload.taskId
          );
          i.tasks[index] = {
            ...i.tasks[index],
            satisfactory: action.payload.status,
          };
        }
      });
    },
  },
  extraReducers: {
    [getInspectionTasks.fulfilled]: (state, action) => {
      return [...action.payload.taskInspects];
    },
    [getInspectionTasks.rejected]: (state, action) => {
      state.taskInspects = null;
    },
  },
});

const { reducer, actions } = taskInspectsSlice;

export const { updateCompleteStatus, updateSatisfactoryStatus } = actions;
export default reducer;
