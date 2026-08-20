// src/features/auth/authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "@/store/store";
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./authTypes";
import { authApi } from "./authApi";
import { ApiErrors, mapApiError } from "@/lib/errors";

// Handles initial login and returns a pending token for OTP verification
export const loginThunk = createAsyncThunk<
  LoginResponse,
  LoginRequest,
  { rejectValue: string }
>("auth/login", async (payload, thunkApi) => {
  try {
    return await authApi.login(payload);
  } catch (err) {
    const { status, message } = mapApiError(err);

    if (status === 401) {
  return thunkApi.rejectWithValue(ApiErrors.LOGIN_INVALID);
}

if (status === 403) {
  return thunkApi.rejectWithValue(
    "Your account is inactive. Please contact an administrator."
  );
}

    return thunkApi.rejectWithValue(message);
  }
});

// Verifies OTP using the pending token stored after login
export const verifyOtpThunk = createAsyncThunk<
  VerifyOtpResponse,
  VerifyOtpRequest,
  { state: RootState; rejectValue: string }
>("auth/verifyOtp", async (payload, thunkApi) => {
  try {
    const pendingToken = thunkApi.getState().auth.pendingToken;

    if (!pendingToken) {
      return thunkApi.rejectWithValue(ApiErrors.NO_PENDING_TOKEN);
    }

    return await authApi.verifyOtp(pendingToken, payload);
  } catch (err) {
    const { status, message } = mapApiError(err);

    if (status === 401 || status === 403) {
      return thunkApi.rejectWithValue(ApiErrors.OTP_INVALID);
    }

    return thunkApi.rejectWithValue(message);
  }
});