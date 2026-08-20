import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#27445D" },
    secondary: { main: "#497D74" },
    background: {
      default: "#F8FAFC",
      paper: "#FFFFFF",
    },
    divider: "rgba(15, 23, 42, 0.10)",
    text: {
      primary: "rgba(15, 23, 42, 0.92)",
      secondary: "rgba(15, 23, 42, 0.62)",
    },
  },

  shape: { borderRadius: 12 },

  typography: {
    fontFamily: [
      "var(--font-geist-sans)",
      "system-ui",
      "-apple-system",
      "Segoe UI",
      "Roboto",
      "Arial",
      "sans-serif",
    ].join(","),
    h4: { fontWeight: 800, letterSpacing: "-0.02em" },
    h5: { fontWeight: 800, letterSpacing: "-0.01em" },
    button: { textTransform: "none", fontWeight: 700 },
  },

  components: {
    MuiContainer: {
      defaultProps: { maxWidth: "lg" },
    },

    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 20,
          border: "1px solid rgba(15, 23, 42, 0.08)",
          boxShadow:
            "0px 1px 2px rgba(15, 23, 42, 0.06), 0px 18px 48px rgba(15, 23, 42, 0.10)",
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          paddingLeft: 18,
          paddingRight: 18,
          height: 44,
        },
      },
    },

    MuiTextField: {
      defaultProps: {
        size: "small",
        variant: "outlined",
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          backgroundColor: "rg(15, 23, 42, 0.02)",
          transition: "box-shadow 120ms ease",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(48, 54, 79, 0.35)",
          },
          "&.Mui-focused": {
            boxShadow: "0 0 0 4px rgba(48, 54, 79, 0.12)",
          },
        },
        notchedOutline: {
          borderColor: "rgba(54, 55, 59, 0.14)",
        },
        input: {
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "rgba(15, 23, 42, 0.62)",
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 800,
          color: "rgba(15, 23, 42, 0.85)",
          backgroundColor: "rgba(15, 23, 42, 0.03)",
        },
        root: {
          borderBottom: "1px solid rgba(15, 23, 42, 0.08)",
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 999,
          fontWeight: 700,
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 20 },
      },
    },

    MuiDialogTitle: {
      styleOverrides: {
        root: { fontWeight: 900 },
      },
    },
  },
});