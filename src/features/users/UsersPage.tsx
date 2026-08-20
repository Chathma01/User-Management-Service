"use client";

import {
  Container,
  Typography,
} from "@mui/material";

import { useUsersPage } from "@/features/users/hooks/useUsersPage";

export default function UsersPage() {
  const vm = useUsersPage();

  if (!vm.accessToken) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Redirecting to Login...</Typography>
      </Container>
    );
  }

}