// src/features/users/usersThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type {
  FetchUsersParams,
  FetchUsersResponse,
//   CreateUserRequest,
//   UpdateUserRequest,
//   ToggleUserStatusRequest,
//   User,
} from "./usersTypes";

import * as usersApi from "./userApi";
import { ApiErrors, mapApiError } from "@/lib/errors";

function requireToken(state: RootState) {
  const token = state.auth.accessToken;
  if (!token) {
    throw new Error(ApiErrors.NOT_AUTHENTICATED);
  }
  return token;
}

function toUsersErrorMessage(err: unknown): string {
  if (err instanceof Error && err.message === ApiErrors.NOT_AUTHENTICATED) {
    return ApiErrors.NOT_AUTHENTICATED;
  }

  const { status, message } = mapApiError(err);

  if (status === 401 || status === 403) {
    return ApiErrors.NOT_AUTHENTICATED;
  }

  return message || ApiErrors.UNKNOWN;
}

export const fetchUsersThunk = createAsyncThunk<
  FetchUsersResponse,
  FetchUsersParams,
  { state: RootState; rejectValue: string }
>("users/fetchUsers", async (params, thunkApi) => {
  try {
    const token = requireToken(thunkApi.getState());
    return await usersApi.fetchUsers(params, token);
  } catch (err) {
    return thunkApi.rejectWithValue(toUsersErrorMessage(err));
  }
});