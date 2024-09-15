import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiService } from "api";
import { tokenUtils } from "utils";
import { setStatus } from ".";
import { Status } from "constants/index";

export const loginRequestAsync = createAsyncThunk(
  "login/loginRequest",
  async (body, { rejectWithValue }) => {
    try {
      const response = await ApiService({
        path: "auth/login",
        method: "POST",
        data: body,
      });
      tokenUtils.setToken(response.access_token);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const logoutRequestAsync = createAsyncThunk(
  "logout/logoutRequest",
  async ({ rejectWithValue, dispatch }) => {
    try {
      tokenUtils.removeToken();
      dispatch(setStatus(Status.IDLE));
      return true;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const registerRequest = createAsyncThunk(
  "register/request",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiService({
        path: "auth/register",
        method: "POST",
        data: body,
      });
      await dispatch(loginRequestAsync(body));
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
