"use client";

import {
  Container,
  Typography,
  Alert,
  CircularProgress,
  Box,
  Paper,
  Divider,
} from "@mui/material";

import UsersToolbar from "@/features/users/components/UsersToolbar";
import UsersSearch from "@/features/users/components/UsersSearch";
import UsersTable from "@/features/users/components/UsersTable";
import UsersPagination from "@/features/users/components/UsersPagination";

import { useUsersPage } from "@/features/users/hooks/useUsersPage";
import UserFormDialog from "./components/UserFormDialog";
import ConfirmDialog from "./components/ConfirmDialog";

export default function UsersPage() {
  const vm = useUsersPage();

  if (!vm.accessToken) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography>Redirecting...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth={false} sx={{ py: { xs: 2, md: 4 } }}>
      <UsersToolbar onCreate={vm.openCreate} onLogout={vm.doLogout} />

      {vm.error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {vm.error}
        </Alert>
      )}

      <Paper
        sx={{
          mt: 3,
          p: { xs: 2, sm: 3 },

          maxWidth: 1500,     
          mx: "auto",         

          width: "100%",
        }}
      >
        {/* Title row */}
        <Box
          sx={{
            display: "flex",
            alignItems: { xs: "flex-start", sm: "baseline" },
            justifyContent: "space-between",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}
            >
              User Directory
            </Typography>
          </Box>

          <Typography variant="body2" color="text.secondary">
            Total:{" "}
            <Box component="span" sx={{ fontWeight: 900, color: "text.primary" }}>
              {vm.total}
            </Box>
          </Typography>
        </Box>

        <Divider sx={{ my: 2 }} />

        <UsersSearch value={vm.searchInput} onChange={vm.setSearchInput} />

        {vm.loading ? (
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 3 }}>
            <CircularProgress size={20} />
            <Typography color="text.secondary">Loading users...</Typography>
          </Box>
        ) : (
          <>
            <UsersTable
              users={vm.items}
              saving={vm.saving}
              onToggleStatus={vm.openConfirmToggle}
              onEdit={vm.openEdit}
            />

            <UsersPagination
              total={vm.total}
              page={vm.page}
              pageSize={vm.pageSize}
              onPageChange={vm.changePage}
              onPageSizeChange={vm.changePageSize}
            />
          </>
        )}
      </Paper>

      {/* Create */}
      <UserFormDialog
        open={vm.createOpen}
        title="Create User"
        onClose={vm.closeCreate}
        onSubmit={vm.submitCreate}
        submitting={vm.saving}
        error={vm.saveError}
      />

      {/* Edit */}
      <UserFormDialog
        open={vm.editOpen}
        title="Edit User"
        initialValues={vm.editInitial}
        onClose={vm.closeEdit}
        onSubmit={vm.submitEdit}
        submitting={vm.saving}
        error={vm.saveError}
      />

      {/* Confirm activate/deactivate */}
      <ConfirmDialog
        open={vm.confirmOpen}
        title={vm.confirmTitle}
        message={vm.confirmMessage}
        confirmLabel={vm.confirmLabel}
        loading={vm.saving}
        onClose={vm.closeConfirm}
        onConfirm={vm.confirmToggle}
      />
    </Container>
  );
}