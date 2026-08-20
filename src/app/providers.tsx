"use client";

import { useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "@/theme";
import { store } from "@/store/store";
import { hydrateAuth } from "@/features/auth/authSlice";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type ProvideProps = { children: React.ReactNode };

export default function Providers({ children }: ProvideProps) {
  useEffect(() => {
    store.dispatch(hydrateAuth());
  }, []);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </ThemeProvider>
        </Provider>
    </LocalizationProvider>
    
  );
}