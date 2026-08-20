"use client";

import { useState } from "react";
import { Alert, Box, Button, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { loginThunk } from "@/features/auth/authThunks";

/**
 * Login form for starting the authentication flow.
 *
 * - Collects email + password.
 * - Dispatches the login thunk, which requests a pending token (OTP step) on success.
 * - Displays a user-friendly error message sourced from the auth slice.
 */
export default function LoginForm() {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.auth);

  // Local form state stays component-scoped; auth state is managed in Redux.
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [validationErrors, setValidationErrors] = useState<{
  email?: string;
  password?: string;
}>({});

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const nextErrors: typeof validationErrors = {};
  const normalizedEmail = email.trim();

  if (!normalizedEmail) {
    nextErrors.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    nextErrors.email = "Enter a valid email address.";
  }

  if (!password) {
    nextErrors.password = "Password is required.";
  } else if (password.length < 6) {
    nextErrors.password = "Password must be at least 6 characters.";
  }

  setValidationErrors(nextErrors);
  if (Object.keys(nextErrors).length > 0) return;

  dispatch(loginThunk({ email: normalizedEmail, password }));
};

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", gap: 2.5 }}
      noValidate
    >
      {/* Page heading */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 700 }}>
          Login
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Log in to your account.
        </Typography>
      </Box>

      {/* Server / validation error surfaced from Redux */}
      {error && <Alert severity="error">{error}</Alert>}

      {/* Email */}
      <Box>
        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
          Email
        </Typography>
        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          fullWidth
          autoComplete="email"
          error={Boolean(validationErrors.email)}
helperText={validationErrors.email}
        />
      </Box>

      {/* Password */}
      <Box>
        <Typography variant="body2" sx={{ mb: 0.5, fontWeight: 600 }}>
          Password
        </Typography>
        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          autoComplete="current-password"
          error={Boolean(validationErrors.password)}
helperText={validationErrors.password}
        />
      </Box>

      <Button
        type="submit"
        variant="contained"
        disabled={loading}
        fullWidth
        sx={{ mt: 1 }}
      >
        {loading ? "Logging in..." : "Sign in"}
      </Button>
    </Box>
  );
}