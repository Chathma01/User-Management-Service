"use client";

import { useState } from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { verifyOtpThunk } from "@/features/auth/authThunks";
import { clearAuthData } from "@/features/auth/authSlice";

/**
 * OTP verification form.
 * Shown after successful login to complete authentication.
 */
export default function OtpForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  const [otp, setOtp] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(verifyOtpThunk({ otp }));
  };

  // Return to login by clearing pending auth state
  const handleBack = () => {
    dispatch(clearAuthData());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
      noValidate
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Button
          variant="text"
          startIcon={<ArrowBack />}
          onClick={handleBack}
          sx={{ p: 0, minWidth: "auto", color: "text.primary" }}
        >
          Back to Login
        </Button>
      </Box>

      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Verify OTP
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the 6-digit verification code.
        </Typography>
      </Box>

      {error && <Alert severity="error">{error}</Alert>}

      <Box>
        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
          OTP
        </Typography>
        <TextField
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
          slotProps={{ htmlInput: { inputMode: "numeric", pattern: "[0-9]*", maxLength: 6 },}}
          required
          fullWidth
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        disabled={loading || otp.length !== 6}
        fullWidth
        sx={{ mt: 1 }}
      >
        {loading ? "Verifying..." : "Verify"}
      </Button>
    </Box>
  );
}