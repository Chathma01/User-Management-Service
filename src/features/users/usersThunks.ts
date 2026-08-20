// src/features/users/usersThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type {
    CreateUserRequest,
  FetchUsersParams,
  FetchUsersResponse,
  ToggleUserStatusRequest,
  UpdateUserRequest,
  User,
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

export const createUserThunk = createAsyncThunk<
  User,
  CreateUserRequest,
  { state: RootState; rejectValue: string }
>("users/createUser", async (payload, thunkApi) => {
  try {
    const token = requireToken(thunkApi.getState());
    return await usersApi.createUser(payload, token);
  } catch (err) {
    return thunkApi.rejectWithValue(toUsersErrorMessage(err));
  }
});

export const updateUserThunk = createAsyncThunk<
  User,
  UpdateUserRequest,
  { state: RootState; rejectValue: string }
>("users/updateUser", async (req, thunkApi) => {
  try {
    const token = requireToken(thunkApi.getState());
    return await usersApi.updateUser(req, token);
  } catch (err) {
    return thunkApi.rejectWithValue(toUsersErrorMessage(err));
  }
});

export const toggleUserStatusThunk = createAsyncThunk<
  User,
  ToggleUserStatusRequest,
  { state: RootState; rejectValue: string }
>("users/toggleStatus", async (req, thunkApi) => {
  try {
    const token = requireToken(thunkApi.getState());
    return await usersApi.toggleUserStatus(req, token);
  } catch (err) {
    return thunkApi.rejectWithValue(toUsersErrorMessage(err));
  }
});