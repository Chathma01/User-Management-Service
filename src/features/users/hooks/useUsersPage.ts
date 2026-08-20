// src/features/users/hooks/useUsersPage.ts
"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authSlice";
import {
  fetchUsersThunk,
} from "@/features/users/usersThunks";
import { setPage, setPageSize, setSearch } from "../usersSlice";

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

  const openCreate = useCallback(() => setCreateOpen(true), []);
  const closeCreate = useCallback(() => setCreateOpen(false), []);

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
  };
}