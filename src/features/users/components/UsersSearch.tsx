import { Box, TextField, Typography } from "@mui/material";

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export default function UsersSearch({ value, onChange }: Props) {
  return (
    <Box sx={{ mb: 2 }}>
      {/* Title */}
      <Typography
        variant="body2"
        sx={{ mb: 0.5, fontWeight: 600 }}
      >
        Search users
      </Typography>

      {/* Input */}
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Try name, email, employee code..."
        fullWidth
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "rgba(255,255,255,0.85)",
          },
        }}
      />
    </Box>
  );
}