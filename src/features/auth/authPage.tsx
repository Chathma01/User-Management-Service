"use client";

import { Box, Paper, Typography } from "@mui/material";
import { useAppSelector } from "@/store/hooks";
import LoginForm from "./components/LoginForm";
import OtpForm from "./components/OtpForm";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Authentication entry page.
 * Renders login or OTP step based on auth state.
 */
export default function AuthPage() {
  const auth = useAppSelector((state) => state.auth);
  const router = useRouter();

  // Redirect to users page after successful OTP verification
  useEffect(() => {
    if (auth.accessToken && auth.otpVerified) {
      router.replace("/users");
    }
  }, [auth.accessToken, auth.otpVerified, router]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1.3fr 0.7fr" },
      }}
    >
      {/* Visual panel (desktop only) */}
      <Box
        sx={{
          display: { xs: "none", md: "block" },
          position: "relative",
          backgroundImage:
            "url(https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(120deg, rgba(48,54,79,0.65), rgba(48,54,79,0.15))",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: 32,
            left: 32,
            p: 3.5,
            maxWidth: 720,
            borderRadius: 4,
            color: "white",
            backdropFilter: "blur(14px)",
            backgroundColor: "rgba(255,255,255,0.12)",
            border: "1px solid rgba(255,255,255,0.25)",
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            User Management Portal
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            Secure authentication with OTP verification.
          </Typography>
        </Box>
      </Box>

      {/* Authentication panel */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "background.default",
          px: 2,
        }}
      >
        <Paper
          elevation={0}
          sx={{
            width: "100%",
            maxWidth: 420,
            minHeight: 420,
            p: 5,
            borderRadius: 5,
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            {auth.pendingToken ? <OtpForm /> : <LoginForm />}
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}