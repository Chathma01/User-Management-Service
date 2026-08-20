"use client";

import { TextField, MenuItem } from "@mui/material";
import Field from "@/features/users/components/Field";

type Option<T extends string> = { value: T; label: string };

type Props<T extends string> = {
  label: string;
  required?: boolean;
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
};

export default function FormSelectField<T extends string>({
  label,
  required = false,
  value,
  onChange,
  options,
}: Props<T>) {
  return (
    <Field label={label} required={required}>
      <TextField select value={value} onChange={(e) => onChange(e.target.value as T)} fullWidth>
        {options.map((o) => (
          <MenuItem key={o.value} value={o.value}>
            {o.label}
          </MenuItem>
        ))}
      </TextField>
    </Field>
  );
}