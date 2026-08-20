import { Box, TablePagination } from "@mui/material";

type Props = {
  total: number;
  page: number; // 1-based
  pageSize: number;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
};

export default function UsersPagination({
  total,
  page,
  pageSize,
  onPageChange,
  onPageSizeChange,
}: Props) {
  return (
    <Box sx={{ mt: 1 }}>
      <TablePagination
        component="div"
        count={total}
        page={page - 1}
        rowsPerPage={pageSize}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={(_, newPage) => onPageChange(newPage + 1)}
        onRowsPerPageChange={(e) => {
          const next = Number(e.target.value);
          onPageSizeChange(next);
          onPageChange(1);
        }}
      />
    </Box>
  );
}