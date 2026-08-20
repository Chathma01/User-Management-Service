import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { User, UserStatus } from "./usersTypes";
import { fetchUsersThunk } from "./usersThunks";

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

        },
});

export const { setSearch, setPage, setPageSize, setStatus } = usersSlice.actions;
export default usersSlice.reducer;