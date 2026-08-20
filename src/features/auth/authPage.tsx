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
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        px: 2,
        py: 4,
        backgroundImage:
          "url('https://images.unsplash.com/photo-1645470112452-277c99f78040?q=80&w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Background overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(4,24,42,0.74) 0%, rgba(9,53,76,0.42) 45%, rgba(74,20,40,0.48) 100%)",
        }}
      />

      {/* Portal title */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 28, md: 40 },
          left: { xs: 24, md: 48 },
          right: { xs: 24, md: "auto" },
          zIndex: 1,
          color: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 800,
            letterSpacing: "-0.03em",
            textShadow: "0 2px 18px rgba(0,0,0,0.35)",
          }}
        >
          User Management Portal
        </Typography>
      </Box>

      {/* Centered authentication panel */}
      <Paper
        elevation={0}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: 420,
          minHeight: 420,
          p: { xs: 3.5, sm: 5 },
          borderRadius: 5,
          display: "flex",
          alignItems: "center",
          color: "#10283a",
          backgroundColor: "rgba(247, 251, 255, 0.9)",
          border: "1px solid rgba(255,255,255,0.5)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          boxShadow:
            "0 24px 70px rgba(0, 20, 38, 0.35), 0 4px 18px rgba(218, 54, 45, 0.12)",

          "& .MuiTypography-root": {
            color: "#10283a",
          },
          "& .MuiInputLabel-root": {
            color: "#31556c",
          },
          "& .MuiOutlinedInput-root": {
            color: "#10283a",
            borderRadius: 3,
            backgroundColor: "rgba(225, 240, 248, 0.72)",

            "& fieldset": {
              borderColor: "rgba(19, 95, 127, 0.24)",
            },
            "&:hover fieldset": {
              borderColor: "#14799a",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#e05235",
            },
          },
        }}
      >
        <Box sx={{ width: "100%" }}>
          {auth.pendingToken ? <OtpForm /> : <LoginForm />}
        </Box>
      </Paper>
    </Box>
  );
}