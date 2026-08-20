export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  pending_token: string;
  token_type: string;
  expires_in: number;
};

export type VerifyOtpRequest = {
  otp: string;
};

export type VerifyOtpResponse = {
  access_token: string;
  token_type: string;
  expires_in: number;
};