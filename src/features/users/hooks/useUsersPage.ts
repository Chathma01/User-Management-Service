// src/features/users/hooks/useUsersPage.ts
"use client";

import { useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { logout } from "@/features/auth/authSlice";
import {
  fetchUsersThunk,
} from "@/features/users/usersThunks";

export function useUsersPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Auth state
  const accessToken = useAppSelector((s) => s.auth.accessToken);
  const hydrated = useAppSelector((s) => s.auth.hydrated);

  // Users state
  const {
    page,
    pageSize,
    search,
    status
  } = useAppSelector((s) => s.users);

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

  const doLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return {
    accessToken,
    page,
    pageSize,
    status,
    doLogout
  };
}