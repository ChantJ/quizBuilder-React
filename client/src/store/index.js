import {
  configureStore,
  combineReducers,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import authReducers from "./auth";
import quizReducers from "./quiz";
import { tokenUtils } from "utils";

const combinedReducer = combineReducers({
  auth: authReducers,
  quiz: quizReducers,
});

const rootReducer = (state, action) => {
  if (action.type === "logout/logoutRequest/pending") {
    tokenUtils.removeToken();
    state = undefined;
  }
  return combinedReducer(state, action);
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware()],
});
