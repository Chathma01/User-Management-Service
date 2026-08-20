"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import type { CreateUserRequest, UserUpsertPayload } from "@/features/users/usersTypes";

// Utility to generate today's date in ISO format (YYYY-MM-DD)
const todayISO = () => new Date().toISOString().slice(0, 10);

// Form field keys derived from API payload
export type FieldKey = keyof CreateUserRequest;

// Basic email format validation
const isEmailValid = (value: string) => {
  const v = value.trim();
  if (!v) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
};

// Default form state for user creation
const blankForm = (): CreateUserRequest => ({
  title: "Mr",
  first_name: "",
  middle_name: null,
  last_name: "",
  date_of_birth: "2000-01-01",
  internal_note: "",
  hire_date: todayISO(), // auto-set on create
  status: "active",
  email: "",
  phone: "",
  department: "",
  job_title: "",
  employee_code: "",
  address: "",
  emergency_contact_name: "",
  emergency_contact_phone: "",
});

export function useUserForm(args: {
  open: boolean;
  initialValues?: UserUpsertPayload;
  onSubmit: (payload: UserUpsertPayload) => void;
}) {
  const { open, initialValues, onSubmit } = args;

  // Local form state
  const [middleNameInput, setMiddleNameInput] = useState("");
  const [form, setForm] = useState<CreateUserRequest>(blankForm());

  // Validation state
  const [touched, setTouched] = useState<Partial<Record<FieldKey, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);

  // Reset or hydrate form when dialog opens
  useEffect(() => {
    if (!open) return;

    setSubmitted(false);
    setTouched({});

    if (initialValues) {
      setForm({ ...initialValues });
      setMiddleNameInput(initialValues.middle_name ?? "");
    } else {
      setForm(blankForm());
      setMiddleNameInput("");
    }
  }, [open, initialValues]);

  // Generic field setter
  const setField = useCallback((key: FieldKey, value: CreateUserRequest[FieldKey]) => {
    setForm((p) => ({ ...p, [key]: value }));
  }, []);

  // Mark field as interacted with (used for validation timing)
  const markTouched = useCallback((key: FieldKey) => {
    setTouched((p) => ({ ...p, [key]: true }));
  }, []);

  // Required fields for submission
  const requiredFields: FieldKey[] = useMemo(
    () => ["first_name", "last_name", "email", "employee_code", "department", "job_title"],
    []
  );

  // Centralized validation logic
  const computeErrors = useCallback(
    (opts: { forceRequired?: boolean } = {}) => {
      const forceRequired = opts.forceRequired ?? false;
      const e: Partial<Record<FieldKey, string>> = {};

      // Required field validation
      if (submitted || forceRequired) {
        for (const key of requiredFields) {
          const v = String(form[key] ?? "").trim();
          if (!v) e[key] = "This field is required.";
        }
      }

      // Email format validation
      const shouldValidateEmail = Boolean(touched.email) || submitted || forceRequired;
      if (shouldValidateEmail && form.email.trim() !== "" && !isEmailValid(form.email)) {
        e.email = "Enter a valid email address.";
      }

      return e;
    },
    [form, requiredFields, submitted, touched.email]
  );

  // Memoized error map
  const errors = useMemo(() => computeErrors(), [computeErrors]);

  // Error helpers for UI components
  const hasError = useCallback((key: FieldKey) => Boolean(errors[key]), [errors]);
  const helperText = useCallback((key: FieldKey) => errors[key] ?? "", [errors]);

  // Submit handler with final validation pass
  const submit = useCallback(() => {
    setSubmitted(true);

    const e = computeErrors({ forceRequired: true });
    if (Object.keys(e).length > 0) return;

    const payload: CreateUserRequest = {
      ...form,
      middle_name: middleNameInput.trim() === "" ? null : middleNameInput.trim(),
      hire_date: form.hire_date || todayISO(),
    };

    onSubmit(payload);
  }, [computeErrors, form, middleNameInput, onSubmit]);

  return {
    form,
    middleNameInput,
    setMiddleNameInput,
    setField,
    markTouched,
    hasError,
    helperText,
    submit,
  };
}