import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import profileService from "../services/profileService";
import { setMessage } from "./message";
import addressService from "../services/addressService";

export const getUsersAll = createAsyncThunk(
  "users/getUsersAll",
  async (all, thunkAPI) => {
    try {
      const data = await profileService.getProfilesAll();
      return { profiles: data };
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (userdata, thunkAPI) => {
    try {
      const res = await profileService.updateUser(userdata);
      return userdata; // need to return the user data for the slice
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

export const removeUserrole = createAsyncThunk(
  "users/removeUserrole",
  async (cmd, thunkAPI) => {
    try {
      const res = await profileService.removeUserrole(cmd);
      return cmd; // 204: need cmd to update slice
    } catch (error) {
      const message = error.message || error.status;

      thunkAPI.dispatch(setMessage(message));
      return thunkAPI.rejectWithValue();
    }
  }
);

// export const deleteUserAddress = createAsyncThunk(
//   "users/deleteAddress",
//   async (id, thunkAPI) => {
//     try {
//       const res = await addressService.deleteUserAddress(id);
//       return res; // need deleted id to remove from redux
//     } catch (error) {
//       const message = error.message || error.status;

//       thunkAPI.dispatch(setMessage(message));
//       return thunkAPI.rejectWithValue();
//     }
//   }
// );

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    removeRoleFromUsers: (state, action) => {
      if (state.length) {
        return state.map((user) => {
          return {
            ...user,
            roles: user.roles.filter((role) => role.id !== action.payload),
          };
        });
      }
    },
    updateRoleForUsers: (state, action) => {
      if (state.length) {
        return state.map((u) => {
          let updated = [...u.roles];
          let index = updated.findIndex((r) => r.id === action.payload.id);
          updated[index] = action.payload;
          return { ...u, roles: updated };
        });
      }
    },
  },
  extraReducers: {
    [getUsersAll.fulfilled]: (state, action) => {
      return [...action.payload.profiles];
    },
    [getUsersAll.rejected]: (state, action) => {
      state.users = null;
    },
    [updateUser.fulfilled]: (state, action) => {
      const index = state.findIndex((user) => user.id === action.payload.id);
      // removing spreader to account for deleted property: []
      state[index] = action.payload;
    },
    [removeUserrole.fulfilled]: (state, action) => {
      if (state.length) {
        const userIndex = state.findIndex(
          (user) => user.id === action.payload.userId
        );
        state[userIndex].roles = state[userIndex].roles.filter(
          (r) => r.id !== action.payload.roleId
        );
      }
    },
  },
});

const { reducer, actions } = usersSlice;

export const { removeRoleFromUsers, updateRoleForUsers } = actions;
export default reducer;
