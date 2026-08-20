import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, verifyOtpThunk } from "./authThunks";
import { authStorage } from "./authStorage";

export type AuthState = {
  pendingToken: string | null;
  accessToken: string | null;
  hydrated: boolean;
  otpVerified: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: AuthState = {
  pendingToken: null,
  accessToken: null,
  hydrated: false,
  otpVerified: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    hydrateAuth(state) {
      state.accessToken = authStorage.getAccessToken();
      state.pendingToken = authStorage.getPendingToken();

      // If token exists, consider OTP “verified” for UI purposes
      state.otpVerified = Boolean(state.accessToken);

      state.hydrated = true;
    },

    logout() {
      authStorage.clear();
      return {
        ...initialState,
        hydrated: true, 
      };
    },

    clearAuthData(state) {
      authStorage.clear();
      state.pendingToken = null;
      state.accessToken = null;
      state.otpVerified = false;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // LOGIN
      .addCase(loginThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.pendingToken = action.payload.pending_token;
        state.accessToken = null;
        state.otpVerified = false;
        state.loading = false;
        state.error = null;

        authStorage.setPendingToken(action.payload.pending_token);
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Login failed";
      })

      // VERIFY OTP
      .addCase(verifyOtpThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyOtpThunk.fulfilled, (state, action) => {
        state.accessToken = action.payload.access_token;
        state.pendingToken = null;
        state.otpVerified = true;
        state.loading = false;
        state.error = null;

        authStorage.setAccessToken(action.payload.access_token);
        authStorage.setPendingToken(""); 
      })
      .addCase(verifyOtpThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "OTP verification failed";
      });
  },
});

export const { hydrateAuth, logout, clearAuthData } = authSlice.actions;
export default authSlice.reducer;