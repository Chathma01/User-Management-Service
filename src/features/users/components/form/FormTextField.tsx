"use client";

import { TextField } from "@mui/material";
import Field from "@/features/users/components/Field";

type Props = {
  label: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
  onBlur?: () => void;

  error?: boolean;
  helperText?: string;

  type?: React.InputHTMLAttributes<unknown>["type"];
  multiline?: boolean;
  minRows?: number;
};

export default function FormTextField({
  label,
  required = false,
  value,
  onChange,
  onBlur,
  error = false,
  helperText = "",
  type,
  multiline,
  minRows,
}: Props) {
  return (
    <Field label={label} required={required} error={error} helperText={helperText}>
      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        type={type}
        fullWidth
        multiline={multiline}
        minRows={minRows}
      />
    </Field>
  );
}