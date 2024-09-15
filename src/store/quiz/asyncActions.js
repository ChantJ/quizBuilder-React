import { createAsyncThunk } from "@reduxjs/toolkit";
import { ApiService } from "api";
import { handleApiCallError } from "../helper";

export const getMyQuizzes = createAsyncThunk(
  "user/quizzes",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiService({
        path: "Quizzes",
        method: "GET",
      });
      return response;
    } catch (error) {
      return handleApiCallError(error, rejectWithValue, dispatch);
    }
  }
);

export const publishQuizz = createAsyncThunk(
  "user/create/quiz",
  async (body, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiService({
        path: "Quizzes",
        method: "POST",
        data: body,
      });
      return response;
    } catch (error) {
        return handleApiCallError(error, rejectWithValue, dispatch);
    }
  }
);

export const deleteQuizz = createAsyncThunk(
  "user/delete/quiz",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await ApiService({
        path: `Quizzes/${id}`,
        method: "DELETE",
      });
      return response;
    } catch (error) {
        return handleApiCallError(error, rejectWithValue, dispatch);
    }
  }
);

export const getQuizz = createAsyncThunk(
    "user/take/quiz",
    async (permalink, { rejectWithValue }) => {
      try {
        const response = await ApiService({
          path: `Quizzes/${permalink}`,
          method: "GET",
        });
        return response;
      } catch (error) {
        return rejectWithValue(error);
      }
    }
  );