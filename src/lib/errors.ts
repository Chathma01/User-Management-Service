// src/lib/errors.ts
import type { ApiError } from "./api";

export const ApiErrors = {
  BASE_URL: "App is not configured correctly. Please contact support.",
  NETWORK: "Network error. Please check your connection and try again.",
  UNKNOWN: "Something went wrong. Please try again.",

  // auth-specific friendly messages
  LOGIN_INVALID: "Invalid email or password.",
  OTP_INVALID: "Invalid OTP. Please try again.",
  NOT_AUTHENTICATED: "Your session has expired. Please log in again.",
  NO_PENDING_TOKEN: "No pending login. Please log in again.",
} as const;

export function mapApiError(err: unknown): { status?: number; message: string } {
  if (!err || typeof err !== "object") return { message: ApiErrors.UNKNOWN };
  const e = err as ApiError;

  // network-ish
  if (e.message === "NETWORK_ERROR" || e.status === 0) {
    return { status: e.status, message: ApiErrors.NETWORK };
  }

  // if api.ts already produced a nice message, use it
  if (typeof e.message === "string" && e.message.trim()) {
    return { status: e.status, message: e.message };
  }

  return { status: e.status, message: ApiErrors.UNKNOWN };
}