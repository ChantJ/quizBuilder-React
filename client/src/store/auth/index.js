import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  loginRequestAsync,
  logoutRequestAsync,
  registerRequest,
} from "./asyncActions";
import { Status } from "constants/index";

const initialState = {
  data: null,
  error: null,
  status: null,
  registerMessage: null,
};

export const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetRegisterMessage: (state, action) => {
      state.registerMessage = null;
    },
    resetErrorMessage: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(logoutRequestAsync.fulfilled, (state, action) => {
        state.data = null;
        state.status = Status.IDLE;
        state.error = null;
      })
      .addCase(loginRequestAsync.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Status.SUCCEEDED;
      })
      .addCase(registerRequest.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Status.SUCCEEDED;
        state.registerMessage = "Registered Successfully";
      })
      .addMatcher(
        isAnyOf(loginRequestAsync.pending, registerRequest.pending),
        (state) => {
          state.error = null;
          state.status = Status.PENDING;
        }
      )
      .addMatcher(
        isAnyOf(loginRequestAsync.rejected, registerRequest.rejected),
        (state, action) => {
          state.error = action.payload.message;
          state.status = Status.FAILED;
        }
      );
  },
});

export const { setStatus, resetRegisterMessage, resetErrorMessage } =
  loginSlice.actions;

export const selectData = (state) => state.auth.data;
export const selectLoginError = (state) => state.auth.error;
export const selectLoginStatus = (state) => state.auth.status;
export const selectRegisterMessage = (state) => state.auth.registerMessage;
export default loginSlice.reducer;
