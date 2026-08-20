import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Button,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import type { User, UserStatus } from "../usersTypes";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

type Props = {
  users: User[];
  saving: boolean;
  onEdit: (user: User) => void;
  onToggleStatus: (userId: string, status: UserStatus) => void;

};

export default function UsersTable({
  users,
  saving,
  onEdit,
  onToggleStatus,
}: Props) {
  return (
    <Box sx={{ overflowX: "auto" }}>
      {/* narrower table */}
      <Table sx={{ minWidth: 900 }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 150, fontWeight: 750 }}>Employee Code</TableCell>
            <TableCell sx={{ width: 220, fontWeight: 750 }}>Name</TableCell>
            <TableCell sx={{ fontWeight: 750 }}>Email</TableCell>
            <TableCell sx={{ width: 150, fontWeight: 750 }}>Department</TableCell>
            <TableCell sx={{ width: 150, fontWeight: 750 }}>Job Title</TableCell>
            <TableCell sx={{ width: 110, fontWeight: 750 }}>Status</TableCell>
            <TableCell align="center" sx={{ width: 290 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={7} sx={{ py: 5 }}>
                <Box sx={{ textAlign: "center" }}>
                  <Box sx={{ fontWeight: 600, mb: 1 }}>
                    No users found
                  </Box>
                  <Box sx={{ color: "text.secondary" }}>
                    Try a different search or clear filters.
                  </Box>
                </Box>
              </TableCell>
            </TableRow>
          ) : (
            users.map((u) => {
              const isActive = u.status === "active";

              return (
                <TableRow key={u.id} hover>
                  <TableCell sx={{ fontWeight: 600 }}>
                    {u.employee_code}
                  </TableCell>

                  <TableCell>
                    {u.first_name} {u.last_name}
                  </TableCell>

                  <TableCell sx={{ color: "text.secondary" }}>
                    {u.email}
                  </TableCell>

                  <TableCell>{u.department}</TableCell>
                  <TableCell>{u.job_title}</TableCell>

     
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        color: isActive
                          ? "rgba(22, 101, 52, 0.9)"   
                          : "rgba(154, 52, 18, 0.9)", 
                        fontWeight: 600
                      }}
                    >
                      {isActive ? "Active" : "Inactive"}
                    </Box>
                  </TableCell>

                  {/* Actions centered + equal sizes */}
                  <TableCell align="center">
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ justifyContent: "center" }}
                    >
                      <Button
                        size="small"
                        variant="outlined"
                        disabled={saving}
                        onClick={() => onToggleStatus(u.id, u.status)}
                        sx={{
                          minWidth: 92, // SAME width
                          fontWeight: 700,
                          borderWidth: 2,
                          borderColor: isActive
                            ? "rgba(154, 52, 18, 0.4)"
                            : "rgba(22, 101, 52, 0.4)",
                          color: isActive
                            ? "rgba(143, 62, 34, 0.9)"
                            : "rgba(22, 101, 52, 0.9)",
                          "&:hover": {
                            backgroundColor: isActive
                              ? "rgba(154, 52, 18, 0.06)"
                              : "rgba(22, 101, 52, 0.06)",
                          },
                        }}
                      >
                        {isActive ? "Inactivate" : "Activate"}
                      </Button>

                      <Tooltip title="Edit user">
                        <IconButton
                          size="small"
                          onClick={() => onEdit(u)}
                          disabled={saving}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 1,
                          }}
                        >
                          <EditOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </Box>
  );
}