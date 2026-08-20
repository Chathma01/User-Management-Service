import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, UserStatus } from "./usersTypes";
import { createUserThunk, fetchUsersThunk, toggleUserStatusThunk, updateUserThunk } from "./usersThunks";

export type UsersState = {
    items: User[];
    total: number;
    loading: boolean;
    error: string | null;

    saving: boolean;
    saveError: string | null;

    search: string;
    page: number;
    pageSize: number;
    status: "all" | UserStatus;
};

const initialState: UsersState = {
    items: [],
    total: 0,
    loading: false,
    error: null,

    saving: false,
    saveError: null,

    search: "",
    page: 1,
    pageSize: 10,
    status: "all",
};

const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setSearch(state, action: PayloadAction<string>) {
            state.search = action.payload;
            state.page = 1; 
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
        setPageSize(state, action: PayloadAction<number>) {
            state.pageSize = action.payload;
            state.page = 1; 
        },
        setStatus(state, action: PayloadAction<"all" | UserStatus>) {
            state.status = action.payload;
            state.page = 1;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Users
            .addCase(fetchUsersThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsersThunk.fulfilled, (state, action) => {
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.loading = false;
                state.error = null;
            })
            .addCase(fetchUsersThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load users";
            })

            // Create User
            .addCase(createUserThunk.pending, (state) => {
                state.saving = true;
                state.saveError = null;
            })
            .addCase(createUserThunk.fulfilled, (state) => {
                state.saving = false;
                state.saveError = null;
            })
            .addCase(createUserThunk.rejected, (state, action) => {
                state.saving = false;
                state.saveError = action.payload ?? "Create user failed";
            })
            
            // Update User
            .addCase(updateUserThunk.pending, (state) => {
                state.saving = true;
                state.saveError = null;
            })
            .addCase(updateUserThunk.fulfilled, (state, action) => {
                state.saving = false;
                state.saveError = null;

                const updated = action.payload;
                const idx = state.items.findIndex((u) => u.id === updated.id);
                if (idx !== -1) state.items[idx] = updated;
            })
            .addCase(updateUserThunk.rejected, (state, action) => {
                state.saving = false;
                state.saveError = action.payload ?? "Update user failed";
            })

            // Toggle status
            .addCase(toggleUserStatusThunk.pending, (state) => {
                state.saving = true;
                state.saveError = null;
            })
            .addCase(toggleUserStatusThunk.fulfilled, (state, action) => {
                state.saving = false;
                state.saveError = null;

                const updated = action.payload;
                const idx = state.items.findIndex((u) => u.id === updated.id);
                if (idx !== -1) state.items[idx] = updated;
            })
            .addCase(toggleUserStatusThunk.rejected, (state, action) => {
                state.saving = false;
                state.saveError = action.payload ?? "Status update failed";
            });

        },
});

export const { setSearch, setPage, setPageSize, setStatus } = usersSlice.actions;
export default usersSlice.reducer;