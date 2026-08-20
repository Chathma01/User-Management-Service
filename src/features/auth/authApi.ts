import { apiRequest } from "@/lib/api";
import type {
  LoginRequest,
  LoginResponse,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "./authTypes";

export const authApi = {
  login(payload: LoginRequest) {
    return apiRequest<LoginResponse>({
      path: "/api/v1/auth/login",
      method: "POST",
      body: payload,
    });
  },

  verifyOtp(pendingToken: string, payload: VerifyOtpRequest) {
    return apiRequest<VerifyOtpResponse>({
      path: "/api/v1/auth/verify-otp",
      method: "POST",
      token: pendingToken,
      body: payload,
    });
  },
}

