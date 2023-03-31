import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import roleService from "../services/roleService";
import { setMessage } from "./message";

export const getRolesAll = createAsyncThunk(
  "roles/getRolesAll",
  async (all, thunkAPI) => {
    try {
      const data = await roleService.getAllRoles();
      return { roles: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateRole = createAsyncThunk(
  "roles/update",
  async (role, thunkAPI) => {
    try {
      const response = await roleService.updateRole(role);
      return role; // return 204 no content
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const saveRole = createAsyncThunk(
  "roles/save",
  async (role, thunkAPI) => {
    try {
      const response = await roleService.saveRole(role);
      return response; // response will include role id, needs to be added
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const deleteRole = createAsyncThunk(
  "roles/delete",
  async (id, thunkAPI) => {
    try {
      const response = await roleService.deleteRole(id);
      return id;
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

const initialState = [];

const rolesSlice = createSlice({
  name: "roles",
  initialState,
  extraReducers: {
    [getRolesAll.fulfilled]: (state, action) => {
      return [...action.payload.roles];
    },
    [getRolesAll.rejected]: (state, action) => {
      state.roles = null;
    },
    [updateRole.fulfilled]: (state, action) => {
      const index = state.findIndex((role) => role.id === action.payload.id);
      state[index] = {
        ...state[index],
        ...action.payload,
      };
    },
    [saveRole.fulfilled]: (state, action) => {
      state.push(action.payload);
    },
    [deleteRole.fulfilled]: (state, action) => {
      return state.filter((role) => role.id !== action.payload);
    },
  },
});

const { reducer } = rolesSlice;
export default reducer;
