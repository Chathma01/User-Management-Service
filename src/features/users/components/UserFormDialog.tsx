"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Divider,
  Typography,
} from "@mui/material";

import type { UserStatus, UserTitle, UserUpsertPayload } from "@/features/users/usersTypes";
import { useUserForm } from "@/features/users/hooks/useUserForm";

import FormTextField from "@/features/users/components/form/FormTextField";
import FormSelectField from "@/features/users/components/form/FormSelectField";
import FormDateField from "@/features/users/components/form/FormDateField";

export type UserFormDialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: (payload: UserUpsertPayload) => void;
  submitting: boolean;
  error: string | null;
  initialValues?: UserUpsertPayload;
};

export default function UserFormDialog({
  open,
  title,
  onClose,
  onSubmit,
  submitting,
  error,
  initialValues,
}: UserFormDialogProps) {
  const vm = useUserForm({ open, initialValues, onSubmit });

  const grid2 = {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
    gap: 2,
  } as const;

  const fullRow = { gridColumn: { xs: "auto", sm: "1 / -1" } } as const;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle sx={{ fontWeight: 800 }}>{title}</DialogTitle>

      <DialogContent dividers>
        {error && (
          <Box
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: 2,
              border: "1px solid rgba(239, 68, 68, 0.25)",
              backgroundColor: "rgba(239, 68, 68, 0.06)",
            }}
          >
            <Typography variant="body2" sx={{ color: "error.main", fontWeight: 600 }}>
              {error}
            </Typography>
          </Box>
        )}

        {/* Identity */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Identity
        </Typography>

        <Box sx={grid2}>
          <FormSelectField<UserTitle>
            label="Title"
            value={vm.form.title}
            onChange={(v) => vm.setField("title", v)}
            options={[
              { value: "Mr", label: "Mr" },
              { value: "Mrs", label: "Mrs" },
              { value: "Ms", label: "Ms" },
              { value: "Mx", label: "Mx" },
              { value: "Dr", label: "Dr" },
            ]}
          />

          <FormSelectField<UserStatus>
            label="Status"
            value={vm.form.status}
            onChange={(v) => vm.setField("status", v)}
            options={[
              { value: "active", label: "Active" },
              { value: "inactive", label: "Inactive" },
            ]}
          />

          <FormTextField
            label="First name"
            required
            value={vm.form.first_name}
            onChange={(v) => vm.setField("first_name", v)}
            onBlur={() => vm.markTouched("first_name")}
            error={vm.hasError("first_name")}
            helperText={vm.helperText("first_name")}
          />

          <FormTextField
            label="Middle name"
            value={vm.middleNameInput}
            onChange={vm.setMiddleNameInput}
            onBlur={() => vm.markTouched("middle_name")}
          />

          <Box sx={fullRow}>
            <FormTextField
              label="Last name"
              required
              value={vm.form.last_name}
              onChange={(v) => vm.setField("last_name", v)}
              onBlur={() => vm.markTouched("last_name")}
              error={vm.hasError("last_name")}
              helperText={vm.helperText("last_name")}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Contact */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Contact
        </Typography>

        <Box sx={grid2}>
          <FormTextField
            label="Email"
            required
            value={vm.form.email}
            onChange={(v) => vm.setField("email", v)}
            onBlur={() => vm.markTouched("email")}
            error={vm.hasError("email")}
            helperText={vm.helperText("email")}
            type="email"
          />

          <FormTextField
            label="Phone"
            value={vm.form.phone}
            onChange={(v) => vm.setField("phone", v)}
            onBlur={() => vm.markTouched("phone")}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Employment */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Employment
        </Typography>

        <Box sx={grid2}>
          <FormTextField
            label="Employee code"
            required
            value={vm.form.employee_code}
            onChange={(v) => vm.setField("employee_code", v)}
            onBlur={() => vm.markTouched("employee_code")}
            error={vm.hasError("employee_code")}
            helperText={vm.helperText("employee_code")}
          />

          <FormTextField
            label="Department"
            required
            value={vm.form.department}
            onChange={(v) => vm.setField("department", v)}
            onBlur={() => vm.markTouched("department")}
            error={vm.hasError("department")}
            helperText={vm.helperText("department")}
          />

          <Box sx={fullRow}>
            <FormTextField
              label="Job title"
              required
              value={vm.form.job_title}
              onChange={(v) => vm.setField("job_title", v)}
              onBlur={() => vm.markTouched("job_title")}
              error={vm.hasError("job_title")}
              helperText={vm.helperText("job_title")}
            />
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Dates */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Dates
        </Typography>

        <Box sx={grid2}>
          <FormDateField
            label="Date of birth"
            value={vm.form.date_of_birth}
            onChange={(v) => vm.setField("date_of_birth", v)}
            onBlur={() => vm.markTouched("date_of_birth")}
          />

          <FormDateField
            label="Hire date"
            value={vm.form.hire_date}
            onChange={(v) => vm.setField("hire_date", v)}
            onBlur={() => vm.markTouched("hire_date")}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Address & Emergency */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Address & Emergency
        </Typography>

        <FormTextField
          label="Address"
          value={vm.form.address}
          onChange={(v) => vm.setField("address", v)}
          onBlur={() => vm.markTouched("address")}
        />

        <Box sx={grid2}>
          <FormTextField
            label="Emergency contact name"
            value={vm.form.emergency_contact_name}
            onChange={(v) => vm.setField("emergency_contact_name", v)}
            onBlur={() => vm.markTouched("emergency_contact_name")}
          />

          <FormTextField
            label="Emergency contact phone"
            value={vm.form.emergency_contact_phone}
            onChange={(v) => vm.setField("emergency_contact_phone", v)}
            onBlur={() => vm.markTouched("emergency_contact_phone")}
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Notes */}
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          Internal note
        </Typography>

        <FormTextField
          label="Note"
          value={vm.form.internal_note}
          onChange={(v) => vm.setField("internal_note", v)}
          onBlur={() => vm.markTouched("internal_note")}
          multiline
          minRows={3}
        />
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} disabled={submitting} variant="outlined" color="secondary">
          Cancel
        </Button>

        <Button variant="contained" onClick={vm.submit} disabled={submitting} sx={{ fontWeight: 700 }}>
          {submitting ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}