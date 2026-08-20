// src/features/users/hooks/useUsersPage.ts
"use client";

import { useEffect, useCallback, useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authSlice";
import {
  createUserThunk,
  fetchUsersThunk,
  toggleUserStatusThunk,
  updateUserThunk,
} from "@/features/users/usersThunks";
import { setPage, setPageSize, setSearch } from "../usersSlice";
import { User, UserStatus, UserUpsertPayload } from "../usersTypes";
import { buildConfirmCopy } from "../usersUiText";

type EditState = {
  open: boolean;
  id: string | null;
  initial?: UserUpsertPayload;
};

/**
 * Confirmation dialog state for activate / deactivate
 */
type ConfirmState = {
  open: boolean;
  userId: string | null;
  currentStatus: UserStatus | null;
};

export function useUsersPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Auth state
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  // Users state
  const {
    items,
    total,
    loading,
    error,
    saving,
    saveError,
    page,
    pageSize,
    search,
    status,
  } = useAppSelector(
    (state) => state.users
  );

  const [searchInput, setSearchInput] = useState(search);
  const [createOpen, setCreateOpen] = useState(false);

  const [edit, setEdit] = useState<EditState>({
    open: false,
    id: null,
    initial: undefined,
  });

  const [confirm, setConfirm] = useState<ConfirmState>({
    open: false,
    userId: null,
    currentStatus: null,
  });

    // Keep search input in sync with Redux value
  useEffect(() => {
    setSearchInput(search);
  }, [search]);

  // Debounced search dispatch
  useEffect(() => {
    const id = setTimeout(() => {
      dispatch(setSearch(searchInput.trim()));
    }, 400);

    return () => clearTimeout(id);
  }, [dispatch, searchInput]);

  // Route protection after hydration
  useEffect(() => {
    if (!hydrated) return;
    if (!accessToken) router.replace("/login");
  }, [hydrated, accessToken, router]);

  // Build query params for list API
  const buildQuery = useCallback(() => {
    const limit = pageSize;
    const offset = (page - 1) * pageSize;

    return {
      limit,
      offset,
      search: search || undefined,
      status: status === "all" ? undefined : status,
    };
  }, [page, pageSize, search, status]);

  // Fetch users on query change
  useEffect(() => {
    if (!accessToken) return;
    dispatch(fetchUsersThunk(buildQuery()));
  }, [accessToken, dispatch, buildQuery]);

  const refetch = useCallback(() => {
    if (!accessToken) return;
    dispatch(fetchUsersThunk(buildQuery()));
  }, [accessToken, dispatch, buildQuery]);

    const toUpsertPayload = useCallback((u: User): UserUpsertPayload => {
    return {
      title: u.title,
      first_name: u.first_name,
      middle_name: u.middle_name,
      last_name: u.last_name,
      date_of_birth: u.date_of_birth,
      internal_note: u.internal_note,
      hire_date: u.hire_date,
      status: u.status,
      email: u.email,
      phone: u.phone,
      department: u.department,
      job_title: u.job_title,
      employee_code: u.employee_code,
      address: u.address,
      emergency_contact_name: u.emergency_contact_name,
      emergency_contact_phone: u.emergency_contact_phone,
    };
  }, []);

  const openCreate = useCallback(() => setCreateOpen(true), []);
  const closeCreate = useCallback(() => setCreateOpen(false), []);

  const submitCreate = useCallback(
    async (payload: UserUpsertPayload) => {
      const result = await dispatch(createUserThunk(payload));
      if (createUserThunk.fulfilled.match(result)) {
        setCreateOpen(false);
        refetch();
      }
    },
    [dispatch, refetch]
  );

    // Edit flow
  const openEdit = useCallback(
    (u: User) => {
      setEdit({
        open: true,
        id: u.id,
        initial: toUpsertPayload(u),
      });
    },
    [toUpsertPayload]
  );

  const closeEdit = useCallback(() => {
    setEdit({ open: false, id: null, initial: undefined });
  }, []);

  const submitEdit = useCallback(
    async (payload: UserUpsertPayload) => {
      if (!edit.id) return;

      const result = await dispatch(
        updateUserThunk({ employee_id: edit.id, data: payload })
      );

      if (updateUserThunk.fulfilled.match(result)) {
        closeEdit();
        refetch();
      }
    },
    [dispatch, edit.id, closeEdit, refetch]
  );

    // Activate / deactivate confirmation
  const openConfirmToggle = useCallback((userId: string, current: UserStatus) => {
    setConfirm({ open: true, userId, currentStatus: current });
  }, []);

  const closeConfirm = useCallback(() => {
    setConfirm({ open: false, userId: null, currentStatus: null });
  }, []);

  const confirmUser = useMemo(() => {
    if (!confirm.userId) return null;
    return items.find((u) => u.id === confirm.userId) ?? null;
  }, [confirm.userId, items]);

  const { title: confirmTitle, message: confirmMessage, label: confirmLabel } = buildConfirmCopy(confirmUser, confirm.currentStatus);

  const confirmToggle = useCallback(async () => {
    if (!confirm.userId || !confirm.currentStatus) return;

    const nextStatus: UserStatus =
      confirm.currentStatus === "active" ? "inactive" : "active";

    const result = await dispatch(
      toggleUserStatusThunk({ employee_id: confirm.userId, nextStatus })
    );

    if (toggleUserStatusThunk.fulfilled.match(result)) {
      closeConfirm();
      refetch();
    }
  }, [confirm.userId, confirm.currentStatus, dispatch, closeConfirm, refetch]);


  const changePage = useCallback((p: number) => dispatch(setPage(p)), [dispatch]);
  const changePageSize = useCallback((s: number) => dispatch(setPageSize(s)), [dispatch]);
  const doLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return {
    accessToken,
    items,
    total,
    loading,
    error,
    saving,
    saveError,
    page,
    pageSize,
    status,
    searchInput,
    setSearchInput,
    changePage,
    changePageSize,
    openCreate,
    doLogout,
    createOpen,
    closeCreate,
    submitCreate,
    editOpen: edit.open,
    editInitial: edit.initial,
    closeEdit,
    submitEdit,
    openEdit,
    confirmOpen: confirm.open,
    openConfirmToggle,
    closeConfirm,
    confirmTitle,
    confirmMessage,
    confirmLabel,
    confirmToggle,
  };
}
