import { Box, Button, Typography } from "@mui/material";

type Props = {
  onCreate: () => void;
  onLogout: () => void;
};

export default function UsersToolbar({ onCreate, onLogout }: Props) {
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 3 },
        py: 2,
        borderRadius: 16,
        backgroundColor: "rgba(48, 54, 79, 0.04)", // primary tint
        border: "1px solid rgba(15, 23, 42, 0.08)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: { xs: "flex-start", sm: "center" },
        gap: 2,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 900, letterSpacing: "-0.02em" }}>
          Users
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Manage employees with search, pagination, and status actions.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 1 }}>
        <Button variant="contained" onClick={onCreate} sx={{ fontWeight: 900 }}>
          Create User
        </Button>

        <Button
          variant="outlined"
          color="secondary"
          onClick={onLogout}
          sx={{ borderWidth: 2, fontWeight: 900 }}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}