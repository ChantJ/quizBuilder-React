import { setStatus } from "./auth";
import { Status } from "constants/index";
import {tokenUtils} from "utils";

export const handleApiCallError = (err, rejectWithValue, dispatch) => {
  if (rejectWithValue(err).payload.status === 401) {
    tokenUtils.removeToken();
    dispatch(setStatus(Status.IDLE))
    rejectWithValue(err);
  } else return rejectWithValue(err);
};
