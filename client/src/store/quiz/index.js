import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  getMyQuizzes,
  publishQuizz,
  deleteQuizz,
  getQuizz,
} from "./asyncActions";
import { Status } from "constants/index";

const initialState = {
  data: [],
  error: null,
  status: null,
  quiz: {},
  createQuizzMessage: null,
  quizError: null,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    resetCreateQuizzMessage: (state, action) => {
      state.createQuizzMessage = null;
    },
    resetErrorMessage: (state) => {
      state.error = null;
    },
    resetQuizErrorMessage: (state) => {
      state.quizError = null;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyQuizzes.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Status.IDLE;
        state.error = null;
      })
      .addCase(getQuizz.fulfilled, (state, action) => {
        state.quiz = action.payload[0];
        state.status = Status.IDLE;
        state.error = null;
      })
      .addCase(getQuizz.rejected, (state, action) => {
        state.quiz = action.payload;
        state.status = Status.FAILED;
        state.quizError = null;
      })
      .addCase(publishQuizz.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Status.IDLE;
        state.createQuizzMessage = "Quizz pulished successfully";
        state.error = null;
      })
      .addCase(deleteQuizz.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = Status.IDLE;
        state.createQuizzMessage = "Quizz deleted successfully";
        state.error = null;
      })
      .addMatcher(
        isAnyOf(
          getMyQuizzes.pending,
          publishQuizz.pending,
          deleteQuizz.pending
        ),
        (state) => {
          state.error = null;
          state.status = Status.PENDING;
        }
      )
      .addMatcher(
        isAnyOf(
          getMyQuizzes.rejected,
          deleteQuizz.rejected,
          publishQuizz.rejected
        ),
        (state, action) => {
          state.error = action.payload.message;
          state.status = Status.FAILED;
        }
      );
  },
});

export const {
  setStatus,
  resetQuizErrorMessage,
  resetCreateQuizzMessage,
  resetErrorMessage,
} = quizSlice.actions;

export const selectQuizData = (state) => state.quiz.data;
export const selectQuizError = (state) => state.quiz.error;
export const selectQuizStatus = (state) => state.quiz.status;
export const selectSingleQuiz = (state) => state.quiz.quiz;
export const selectSingleQuizError = (state) => state.quiz.quizError;
export const selectCreateQuizzMessage = (state) =>
  state.quiz.createQuizzMessage;
export default quizSlice.reducer;
