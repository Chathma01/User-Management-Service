"use client";

import { TextField } from "@mui/material";
import Field from "@/features/users/components/Field";

type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;
};

export default function FormDateField({ label, value, onChange, onBlur }: Props) {
  return (
    <Field label={label}>
      <TextField
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        fullWidth
        InputLabelProps={{ shrink: true }}
      />
    </Field>
  );
}