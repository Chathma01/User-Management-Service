"use client";

import { Box, Typography } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  label: string;
  required?: boolean;
  error?: boolean;
  helperText?: string;
  children: ReactNode;
};

export default function Field({
  label,
  required = false,
  error = false,
  helperText = "",
  children,
}: Props) {
  return (
    <Box>
      {/* Label row */}
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.75, mb: 0.75 }}>
        <Typography variant="body2" sx={{ fontWeight: 500, color: "text.primary" }}>
          {label}
        </Typography>

        {required && (
          <Typography
            variant="body2"
            sx={{ color: "error.main", fontWeight: 700, lineHeight: 1 }}
          >
            *
          </Typography>
        )}
      </Box>

      {children}

      <Typography
        variant="caption"
        sx={{
          display: "block",
          mt: 0.75,
          minHeight: 18,
          color: error ? "error.main" : "transparent",
        }}
      >
        {helperText || " "}
      </Typography>
    </Box>
  );
}