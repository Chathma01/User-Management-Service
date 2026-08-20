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
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: 2,
      }}
    >

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